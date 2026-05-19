import { useEffect, useState } from "react";
import "./App.css";

import StoryForm from "./components/StoryForm";
import StoryPreview from "./components/StoryPreview";
import SavedStories from "./components/SavedStories";
import ChildProfiles from "./components/ChildProfiles";

function App() {
  const [childName, setChildName] = useState("");
  const [ageRange, setAgeRange] = useState("2-3");
  const [storyType, setStoryType] = useState("Bedtime");
  const [character, setCharacter] = useState("Puppy");
  const [lesson, setLesson] = useState("Sharing");
  const [length, setLength] = useState("Short");
  const [customCharacter, setCustomCharacter] = useState("");
  const [customLesson, setCustomLesson] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedStorySearch, setSavedStorySearch] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [savedStoriesError, setSavedStoriesError] = useState("");
  const [savedStorySort, setSavedStorySort] = useState("newest");
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileName, setProfileName] = useState("");
  const [profileAgeRange, setProfileAgeRange] = useState("2-3");
  const [favoriteCharacter, setFavoriteCharacter] = useState("");
  const [profileNotes, setProfileNotes] = useState("");

  const [story, setStory] = useState(null);
  const [savedStories, setSavedStories] = useState([]);

  useEffect(() => {
    loadSavedStories();
    loadProfiles();
  }, []);


  async function loadSavedStories() {
    try {
      setSavedStoriesError("");

      const response = await fetch("http://localhost:8080/api/stories/saved");

      if (!response.ok) {
        throw new Error("Failed to load saved stories.");
      }

      const data = await response.json(); 
      setSavedStories(data);
    } catch (error) {
      console.error("Error loading saved stories:", error)
    }
  } 

  async function loadProfiles() {
    try {
      const response = await fetch("http://localhost:8080/api/profiles");

      if (!response.ok) {
        throw new Error("Failed to load profiles.");
      }

      const data = await response.json(); 
      setProfiles(data);
    } catch (error) {
      console.error("Error loading profiles:", error)
    }
  }

  async function handleGenerateStory() {
    const finalCharacter = 
      character === "Custom" && customCharacter.trim() !== ""
      ? customCharacter
      : character;

    const finalLesson = 
      lesson === "Custom" && customLesson.trim() !== ""
      ? customLesson 
      : lesson;

    const storyRequest = {
      childName, 
      ageRange, 
      storyType, 
      character: finalCharacter, 
      lesson: finalLesson, 
      length, 
    };

    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:8080/api/stories/generate", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storyRequest),
      });

      if (!response.ok) {
        throw new Error("Failed to generate story.")
      }

      const data = await response.json(); 
      setStory(data);
    } catch (error) {
        console.error("Error generating story:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSaveStory() {
    if (!story) return; 

    const storyAlreadySaved = savedStories.some((savedStory) => {
      return savedStory.title === story.title && savedStory.text === story.text
    });

    if (storyAlreadySaved) {
      setSavedMessage("Story already saved!");

      setTimeout(() => {
        setSavedMessage("");
      }, 2000);
     
      return;
    }

    try {
      setIsSaving(true);

      const response = await fetch("http://localhost:8080/api/stories/saved", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(story),
      });

      if (!response.ok) {
        throw new Error("Failed to save story.")
      }

      const savedStory = await response.json();

      setSavedStories([...savedStories, savedStory]);
      setSavedMessage("Saved!");

      setTimeout(() => {
        setSavedMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error saving story:", error);
      setSavedMessage("Could not save story.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleReadAloud() {
    if (!story) return; 

    const speech = new SpeechSynthesisUtterance(story.text);
    speech.rate = 0.85;
    speech.pitch = 1; 
    speech.volume = 1; 

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  }

  function handleStopReading() {
    window
    .speechSynthesis.cancel();
  }

  async function handleDeleteStory(storyId) {
    try {
      setIsDeleting(true);
      setSavedStoriesError("");

      const response = await fetch(`http://localhost:8080/api/stories/saved/${storyId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete story.");
      }

      const updatedStories = savedStories.filter((savedStory) => {
        return savedStory.id !== storyId
      });

      setSavedStories(updatedStories);
    } catch (error) {
      console.error("Error deleting story:", error)
      setSavedStoriesError("Could not delete story.");
    } finally {
      setIsDeleting(false);
    }
  }

  function handleSelectSavedStories(selectedStory) {
    setStory(selectedStory);
  }

  function handleClearForm() {
    setChildName("");
    setAgeRange("2-3");
    setStoryType("Bedtime");
    setCharacter("Puppy");
    setCustomCharacter("");
    setLesson("Sharing");
    setCustomLesson("");
    setLength("Short");
    setStory(null);
    setSavedMessage("");
  }

  async function handleCreateProfile() {
    if (!profileName.trim()) return; 

    const newProfile = {
      childName: profileName.trim(),
      ageRange: profileAgeRange, 
      favoriteCharacter: favoriteCharacter.trim(), 
      notes: profileNotes.trim(),
    };

    try {
      const response = await fetch("http://localhost:8080/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProfile),
      });

      if (!response.ok) {
        throw new Error("Failed to create profile.");
      }

      const savedProfile = await response.json();

      setProfiles([...profiles, savedProfile]);
      setSelectedProfile(savedProfile);

      setProfileName("");
      setProfileAgeRange("2-3");
      setFavoriteCharacter("");
      setProfileNotes("");

      setChildName(savedProfile.childName);
      setAgeRange(savedProfile.ageRange);

      if (savedProfile.favoriteCharacter) {
        setCharacter("Custom");
        setCustomCharacter(savedProfile.favoriteCharacter);
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  }

  function handleSelectProfile(profile) {
    setSelectedProfile(profile);

    setChildName(profile.childName);
    setAgeRange(profile.ageRange);

    if (profile.favoriteCharacter) {
      setCharacter("Custom");
      setCustomCharacter(profile.favoriteCharacter);
    }
  }

  async function handleDeleteProfile(profileId) {
    try {
      const response = await fetch(`http://localhost:8080/api/profiles/${profileId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete profile.");
      }

      const updatedProfiles = profiles.filter((profile) => {
        return profile.id !== profileId;
      });

      setProfiles(updatedProfiles);

      if (selectedProfile && selectedProfile.id === profileId) {
        setSelectedProfile(null);
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  }

  async function handleUpdateStoryTitle(storyId, newTitle) {
    if (!newTitle.trim()) return;

    const storyToUpdate = savedStories.find((savedStory) => {
      return savedStory.id === storyId;
    });

    if (!storyToUpdate) return; 

    const updatedStory = {
      ...storyToUpdate, 
      title: newTitle.trim(),
    };

    try {
      const response = await fetch(`http://localhost:8080/api/stories/saved/${storyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStory),
      });

      if (!response.ok) {
        throw new Error("Failed to update story title.");
      }

      const savedUpdatedStory = await response.json();

      setSavedStories((currentStories) => 
        currentStories.map((savedStory) => {
          if (savedStory.id === storyId) {
            return savedUpdatedStory;
          }
          return savedStory; 
        })
      );

      setStory((currentStory) => {
        if (currentStory && currentStory.id === storyId) {
          return savedUpdatedStory;
        }

        return currentStory;
      });

      return true;
    } catch (error) {
      console.error("Error updating story title:", error);
      return false; 
    }
  }

  const filteredSavedStories = savedStories.filter((savedStory) => {
    const searchText = savedStorySearch.toLowerCase(); 

    const title = savedStory.title || "";
    const storyType = savedStory.storyType || "";
    const lesson = savedStory.lesson || "";
    const character = savedStory.character || "";

    return (
      title.toLowerCase().includes(searchText) ||
      storyType.toLowerCase().includes(searchText) ||
      lesson.toLowerCase().includes(searchText) ||
      character.toLowerCase().includes(searchText)
    );
  });

  const sortedSavedStories = [...filteredSavedStories].sort((a, b) => {
    const titleA = a.title || "";
    const titleB = b.title || "";

    if (savedStorySort === "newest") {
      return b.id - a.id; 
    }

    if (savedStorySort === "oldest") {
      return a.id - b.id; 
    }

    if (savedStorySort === "az") {
      return titleA.localeCompare(titleB);
    }

    if (savedStorySort === "za") {
      return titleB.localeCompare(titleA);
    }

    return 0;
  });

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">AI Storytelling for Parents</p>
        <h1>Little Lanterns</h1>
        <p className="subtitle">
          Create gentle toddler-safe bedtime and learning stories in seconds.
        </p>
      </section>

      <ChildProfiles
        profiles={profiles}
        selectedProfile={selectedProfile}
        profileName={profileName}
        setProfileName={setProfileName}
        profileAgeRange={profileAgeRange}
        setProfileAgeRange={setProfileAgeRange}
        favoriteCharacter={favoriteCharacter}
        setFavoriteCharacter={setFavoriteCharacter}
        profileNotes={profileNotes}
        setProfileNotes={setProfileNotes}
        onCreateProfile={handleCreateProfile}
        onSelectProfile={handleSelectProfile}
        onDeleteProfile={handleDeleteProfile}
      />
        

      <section className="layout">
        <StoryForm
            childName={childName}
            setChildName={setChildName}
            ageRange={ageRange}
            setAgeRange={setAgeRange}
            storyType={storyType}
            setStoryType={setStoryType}
            character={character}
            setCharacter={setCharacter}
            customCharacter={customCharacter}
            setCustomCharacter={setCustomCharacter}
            lesson={lesson}
            setLesson={setLesson}
            customLesson={customLesson}
            setCustomLesson={setCustomLesson}
            length={length}
            setLength={setLength}
            onGenerateStory={handleGenerateStory}
            onClearForm={handleClearForm}
        />

        <StoryPreview
          story={story}
          isLoading={isLoading}
          isSaving={isSaving}
          onReadAloud={handleReadAloud}
          onStopReading={handleStopReading}
          onSaveStory={handleSaveStory}
          onRegenerateStory={handleGenerateStory}
          savedMessage={savedMessage}
        />
      </section>

      <SavedStories 
        savedStories={sortedSavedStories}
        savedStorySearch={savedStorySearch}
        setSavedStorySearch={setSavedStorySearch}
        savedStorySort={savedStorySort}
        setSavedStorySort={setSavedStorySort}
        isDeleting={isDeleting}
        savedStoriesError={savedStoriesError}
        onDeleteStory={handleDeleteStory}
        onSelectStory={handleSelectSavedStories}
        onUpdateStoryTitle={handleUpdateStoryTitle}
      />
    </main>
  );
}

export default App; 