/* eslint-disable react/prop-types */

export default function PlaceImg({ place, index = 0, className = '' }) {
    if (!place.photos || place.photos.length === 0) {
        return <p>No image available</p>; // Handle case when there are no photos
    }

    // Construct the image URL by appending the photo path to the base URL
    const imageUrl = `http://localhost:5000/${place.photos[index]}`;

    console.log(`Loading image from URL: ${imageUrl}`); // Debug log

    return (
        <img
            className={className}
            src={imageUrl}
            alt={`Photo ${index + 1}`}
            onError={() => console.error(`Failed to load image from ${imageUrl}`)}
        />
    );
}
