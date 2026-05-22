function ChildProfiles({
    profiles, 
    selectedProfile,
    profileName, 
    setProfileName, 
    profileAgeRange, 
    setProfileAgeRange, 
    favoriteCharacter, 
    setFavoriteCharacter, 
    profileNotes,
    setProfileNotes,
    onCreateProfile,
    onSelectProfile, 
    onDeleteProfile, 
    onClearSelectedProfile
}) {
    return (
        <section className="card profile-section">
            <h2>Child Profiles</h2>

            <label>
                Child Name
                <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Example: CeCe"
                />
            </label>

            <label>
                Age Range
                <select
                    value={profileAgeRange}
                    onChange={(e) => setProfileAgeRange(e.target.value)}
                >
                    <option value="1-2">1-2 years old</option>
                    <option value="2-3">2-3 years old</option>
                    <option value="3-4">3-4 years old</option>
                    <option value="4-5">4-5 years old</option>
                </select>
            </label>

            <label>
                Favorite Character
                <input
                    type="text"
                    value={favoriteCharacter}
                    onChange={(e) => setFavoriteCharacter(e.target.value)}
                    placeholder="Example: dinosaur"
                />
            </label>

            <label>
                Notes
                <input
                    type="text"
                    value={profileNotes}
                    onChange={(e) => setProfileNotes(e.target.value)}
                    placeholder="Example: likes calm bedtime stories"
                />
            </label>

            <button className="primary-button" onClick={onCreateProfile}>
                Create Profile
            </button>

            {selectedProfile && (
                <p className="save-message">
                    Active profile: {selectedProfile.childName}
                </p>
            )}

            <div className="saved-grid">
                {profiles.map((profile) => (
                    <div className="saved-story" key={profile.id}>
                        <button
                            className="saved-story-button"
                            onClick={(e) => onSelectProfile(profile)}
                            >
                                <h3>{profile.childName}</h3>
                                <p>{profile.ageRange} · {profile.favoriteCharacter}</p>
                            </button>

                            <button
                                className="delete-button"
                                onClick={(e) => onDeleteProfile(profile.id)}
                            >
                                Delete
                            </button>
                    </div>
                ))}
            </div>
        </section>
    )

}

export default ChildProfiles;