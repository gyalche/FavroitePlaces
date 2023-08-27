const GOOGLE_API_KEY = 'dadadfasdfasdfsdfad';
function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap
&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:red%7C${lat}, ${lng}&key=YOUR_API_KEY&signature=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}
