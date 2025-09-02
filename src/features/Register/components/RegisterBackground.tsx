export default function RegisterBackground() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="https://cdn.pixabay.com/video/2020/08/23/47892-452144048_large.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
  );
}