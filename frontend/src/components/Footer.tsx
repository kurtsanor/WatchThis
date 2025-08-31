function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "1rem",
        marginTop: "4rem",
        borderTop: "solid 1px #404040",
      }}
    >
      <p style={{ textAlign: "center", fontSize: "0.85rem" }}>
        Movie data and images provided by
      </p>
      <a href="https://www.themoviedb.org/">
        <img src="/TMBD logo.svg" alt="TMBD logo" height={20}></img>
      </a>
      <p
        style={{
          textAlign: "center",
          fontSize: "0.85rem",
          fontStyle: "italic",
        }}
      >
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </p>
    </footer>
  );
}
export default Footer;
