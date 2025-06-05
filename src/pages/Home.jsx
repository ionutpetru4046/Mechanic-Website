function Home() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/background-image.avif')", // Image in public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        margin: 0,
        padding: 0,
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#fff",
          textShadow: "2px 2px 8px #000",
        }}
      >
        🏠 Welcome to Expert Automotive!
      </h1>
    </div>
  );
}

export default Home;
