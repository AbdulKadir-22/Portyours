
import '../Styles/HomePortfolio.css'; 
// import profile from '../../assets/profile.jpg'; // No longer needed

// ✨ Accepts a 'data' prop
function HomePortfolio({ data }) {
  // ✨ Use optional chaining (?.) to prevent errors if data is still loading
  const homeData = data?.home;

  return (
    <section className="home" id="home"> {/* ✨ Added id="home" */}
      <div className="home-text">
        <h2>Hello, I'm</h2>
        {/* ✨ Display dynamic data */}
        <h1>{homeData?.name || 'Your Name'}</h1>
        <h3>{homeData?.title || 'Your Profession'}</h3>
        <p>{homeData?.description || 'Your Passion, job and goals'}</p>
        <a href="#about" className="home-btn">About Me</a>
      </div>
      <div className="home-img">
        {/* ✨ Display dynamic image with a fallback */}
        <img src={homeData?.profilePhoto || 'https://via.placeholder.com/300'} alt="profile" />
      </div>
    </section>
  );
}

export default HomePortfolio;