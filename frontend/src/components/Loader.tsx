const Loader = () => {
    return (
        <div style={containerStyle}>
            <div className="spinner"></div>
            <p>Loading profile...⏳</p>
        </div>
    );
};

const containerStyle = {
    textAlign: "center" as const,
    marginTop: "100px",

};
export default Loader;