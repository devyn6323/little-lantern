function StoryForm({
    childName, 
    setChildName, 
    ageRange, 
    setAgeRange, 
    storyType, 
    setStoryType, 
    character, 
    setCharacter,
    customCharacter,
    setCustomCharacter, 
    lesson, 
    setLesson,
    customLesson,
    setCustomLesson, 
    length, 
    setLength, 
    onGenerateStory,
    onClearForm,
}) {
    return (
         <div className="card">
      <h2>Create a Story</h2>

      <label>
        Child's Name
        <input
          type="text"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          placeholder="Example: CeCe"
        />
      </label>

      <label>
        Age Range
        <select value={ageRange} onChange={(e) => setAgeRange(e.target.value)}>
          <option value="1-2">1–2 years old</option>
          <option value="2-3">2–3 years old</option>
          <option value="3-4">3–4 years old</option>
          <option value="4-5">4–5 years old</option>
        </select>
      </label>

      <label>
        Story Type
        <select value={storyType} onChange={(e) => setStoryType(e.target.value)}>
          <option>Bedtime</option>
          <option>Silly</option>
          <option>Adventure</option>
          <option>Learning</option>
          <option>Calm Down</option>
        </select>
      </label>

      <label>
        Main Character
        <select value={character} onChange={(e) => setCharacter(e.target.value)}>
          <option>Puppy</option>
          <option>Dinosaur</option>
          <option>Bear</option>
          <option>Robot</option>
          <option>Dragon</option>
          <option>Bunny</option>
          <option>Custom</option>
        </select>
      </label>
      {character === "Custom" && (
        <label>
            Custom Character
            <input
                type="text"
                value={customCharacter}
                onChange={(e) => setCustomCharacter(e.target.value)}
                placeholder="Example: firefighter dinosaur"
            />
        </label>
      )}

      <label>
        Lesson
        <select value={lesson} onChange={(e) => setLesson(e.target.value)}>
          <option>Sharing</option>
          <option>Being Gentle</option>
          <option>Cleaning Up</option>
          <option>Brushing Teeth</option>
          <option>Trying Again</option>
          <option>Listening</option>
          <option>Custom</option>
        </select>
      </label>
      {lesson === "Custom" && (
        <label>
            Custom Lesson
            <input
                type="text"
                value={customLesson}
                onChange={(e) => setCustomLesson(e.target.value)}
                placeholder="Example: learning to sleep in their own bed"
            />
        </label>
      )}

      <label>
        Story Length
        <select value={length} onChange={(e) => setLength(e.target.value)}>
          <option>Short</option>
          <option>Medium</option>
          <option>Long</option>
        </select>
      </label>

      <button className="primary-button" onClick={onGenerateStory}>
        Create Story
      </button>
      <button className="secondary-form-button" onClick={onClearForm}>
        Clear Form
      </button>
    </div>
  );
    
}

export default StoryForm; 