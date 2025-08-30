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
      }}
    >
      <p style={{ textAlign: "center" }}>Movie data and images provided by</p>
      <a href="https://www.themoviedb.org/">
        <img src="src/assets/TMBD logo.svg" alt="TMBD logo" height={30}></img>
      </a>
    </footer>
  );
}
export default Footer;
