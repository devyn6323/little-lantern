function StoryPreview({ 
    story,
    isLoading,
    isSaving,
    onReadAloud,
    onStopReading,
    onSaveStory,
    onRegenerateStory,
    savedMessage
 }) {
    return (
        <div className="card story-card">
            <h2>Story Preview</h2>

            {isLoading && (
                <p className="empty-message">Creating your story...</p>
            )}

            {!story && (
                <p className="empty-message">
                    Fill out the form and create your first story.
                </p>
            )}

            {story && (
                <>
                    <h3>{story.title}</h3>

                    <div className="story-meta">
                        <span>{story.storyType}</span>
                        <span>{story.lesson}</span>
                        <span>Ages {story.ageRange}</span>
                    </div>

                    <p className="story-text">{story.text}</p>

                    <div className="button-row">
                        <button onClick={onReadAloud}>Read Aloud</button>
                        <button onClick={onStopReading}>Stop Reading</button>
                        <button onClick={onSaveStory} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Story"}
                        </button>
                        <button onClick={onRegenerateStory}>Regenerate</button>
                    </div>

                    {savedMessage && <p className="save-message">{savedMessage}</p>}
                </>
            )}
        </div>
    )
}

export default StoryPreview;