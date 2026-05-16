function SavedStories({ savedStories, onDeleteStory, onSelectStory }) {
  return (
    <section className="card saved-section">
      <h2>Saved Stories</h2>

      {savedStories.length === 0 && (
        <p className="empty-message">No saved stories yet.</p>
      )}

      <div className="saved-grid">
        {savedStories.map((savedStory) => (
          <div className="saved-story" key={savedStory.id}>
            <button
              className="saved-story-button"
              onClick={() => onSelectStory(savedStory)}
            >
              <h3>{savedStory.title}</h3>
              <p>
                {savedStory.storyType} · {savedStory.lesson}
              </p>
            </button>

            <button 
              className="delete-button"
              onClick={() => onDeleteStory(savedStory.id)}
              onClick={() => {
              onDeleteStory(savedStory.id);
}}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SavedStories;