
function Footer ({ isDarkMode }) {
    const footerStyle = {
        padding: "1rem 2rem",
        backgroundColor: isDarkMode ? "#333" : "#e2e2e2",
        color: isDarkMode ? "#f2f2f2" : "#1a1a1a",
        textAlign: "center",
        marginTop: "auto",
        height: "60px",
    };

    return (
        <footer style={footerStyle}>
            <p>&copy; {new Date().getFullYear()} Expert Automotive. All rights reserved.</p>
        </footer>
    )
}

export default Footer;