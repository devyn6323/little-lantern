import { useState } from "react";

function SavedStories({
   savedStories,
   savedStorySearch,
   setSavedStorySearch,
   isDeleting,
   savedStoriesError,
   onDeleteStory,
   onSelectStory,
   onUpdateStoryTitle
}) {

const [editingStoryId, setEditingStoryId] = useState(null);
const [editedTitle, setEditedTitle] = useState("");

  return (
    <section className="card saved-section">
      <h2>Saved Stories</h2>
      <input
        type="text"
        value={savedStorySearch}
        onChange={(e) => setSavedStorySearch(e.target.value)}
        placeholder="Search saved stories..."
        className="search-input"
        />
      {savedStoriesError && (
        <p className="empty-message">{savedStoriesError}</p>
      )}

      {savedStorySearch && (
        <button
        className="secondar-form-button"
        onClick={() => setSavedStorySearch("")}
        >
          Clear Search
        </button>
      )}
      

      {savedStories.length === 0 && (
        <p className="empty-message">No saved stories yet.</p>
      )}

      <div className="saved-grid">
        {savedStories.map((savedStory) => (
          <div className="saved-story" key={savedStory.id}>
          {editingStoryId === savedStory.id ? (
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />

              <button
              onClick={async () => {
               const updated = await onUpdateStoryTitle(savedStory.id, editedTitle);

               if (updated) {
                setEditingStoryId(null);
                setEditedTitle("");
               }
              }}
              >
                Save Title
              </button>

              <button 
                onClick={() => {
                  setEditingStoryId(null);
                  setEditedTitle("");
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="saved-story-button"
              onClick={() => onSelectStory(savedStory)}
            >
              <h3>{savedStory.title}</h3>
              <p>
                {savedStory.storyType} · {savedStory.lesson}
              </p>
            </button>
          )}

            <button
              onClick={() => {
                setEditingStoryId(savedStory.id);
                setEditedTitle(savedStory.title);
              }}
              >
                Edit Title
            </button>

            <button 
              className="delete-button"
              onClick={() => onDeleteStory(savedStory.id)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SavedStories;