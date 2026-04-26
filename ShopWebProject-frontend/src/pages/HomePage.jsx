import { NavLink } from 'react-router-dom';
import './HomePage.css';
import { useEffect, useState } from 'react';
import ProductService from '../services/ProductService';
import UserService from '../services/UserService';

function HomePage() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const data = await ProductService.totalProducts();
        setTotalProducts(data.total ?? data);
      } catch(error) {
        console.error('Failed to fetch total products:', error);
      }
    };

    const fetchTotalUsers = async () => {
      try {
        const data = await UserService.totalRegisteredUsers();
        setTotalUsers(data.total ?? data);
      } catch(error) {
        console.error('Failed to fetch total users:', error);
      }
    };
    
    fetchTotalProducts();
    fetchTotalUsers();
  }, []);

  return (
    <div className='home-page'>
      {/* Hero Section */}
      <section className='hero-section'>
        <div className='hero-container'>
          <div className='hero-image-wrapper'>
            <img 
              alt='Library Interior' 
              className='hero-image'
              src='https://lh3.googleusercontent.com/aida-public/AB6AXuAP-ewDAlsPlHRzqv5wt1zOkSSghcHD1z5Fnq_t0Af_oie5foHSoyPBN_MCQKP4wesZV5UzXo-ubI7hVfhuExMwkMcBbm9t54I64O7nB5XOCJQj5Uc3S0X3QgwDlivMCQiG7vf5UNy7olwaZmArO8IZfEduuMKve8l83Z6BdO8irUi0if40LHDwiaUSrx0bmLrTB0sfwiOYB2TG5M7UoZ2WdBpf4ptNvATylpit0FQbGRP-NJvIt1FJJHlgWNEs7lrZ-UsNHWtVTvxN'
            />
            <div className='hero-overlay'>
              <div className='hero-content'>
                <span className='hero-label'>Spring Collection 2024</span>
                <h1 className='hero-title'>The Art of the Printed Word</h1>
                <p className='hero-description'>
                  Discover a curated selection of rare editions and modern masterpieces designed for the discerning bibliophile.
                </p>
                <button className='hero-button'>Explore the Archive</button>
              </div>
            </div>
            <div className='hero-nav-buttons'>
              <button className='hero-nav-btn'>←</button>
              <button className='hero-nav-btn'>→</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className='featured-section'>
        <div className='featured-container'>
          <div className='featured-header'>
            <div>
              <h2 className='featured-title'>Featured Books</h2>
              <p className='featured-subtitle'>Hand-selected literature for your personal collection.</p>
            </div>
            <NavLink to='/marketplace' className='featured-view-all'>View All</NavLink>
          </div>

          <div className='featured-grid'>
            {/* Book Card 1 */}
            <div className='book-card'>
              <div className='book-image-wrapper'>
                <img 
                  alt='Minimalist Book Cover' 
                  className='book-image'
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuCq-8Vinw_gMJN6n0UqTJ_QjPq3nGCPGkLhfLTcDjMPuROHmWQEAVz58JAvyYXDRz0x6EwdUP7Q0dpeadEfSSCAaDPBubWP9HRlu-YChUEM0jpZAC1COkpVHg7Wtlv9aHfAe37FSQDco-4JnInK2VRwjvic8LZDWM8uykPlfKIVSCrLF4ev8R-ida7oDzc7bhU2J2VBDOPBtsfW2AMILi7vv6hfuNtSp3b6aZRTulLCzeuYjJCeXUveTO9EMg4sFZHPB0oyRwIurhOJ'
                />
              </div>
              <span className='book-category'>Philosophy</span>
              <h3 className='book-title'>Meditations of the Mind</h3>
              <p className='book-author'>Evelyn St. Claire</p>
              <p className='book-price'>$32.00</p>
            </div>

            {/* Book Card 2 */}
            <div className='book-card'>
              <div className='book-image-wrapper'>
                <img 
                  alt='Classical Book Cover' 
                  className='book-image'
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuC8hkZIIwvg8Cahw6Kn6ddGE9KHTh9V0lPoYknaNWcW8IBDYjYHMeoqxcx3UqGFU6KysPP13fvWBhTv4mGIQPMoYWaiaJU4MOH92qEPqJbcx8OscOqqvKLWT3QDliNj2FVEhETcYZ1PpXiVOLlsN31uouJoZZQJeicsRsBCQVJ5ETdiKgAmjUcdazsNOj9-xq6OTgrpVmF5XdzprjNxCeG6ajlJuq9ZCSJgxzZqwkZiHYSnL5Y4kBoTGEVO9T6BNEb3TpvPoL0gYwHO'
                />
              </div>
              <span className='book-category'>Classic Fiction</span>
              <h3 className='book-title'>Echoes of the Estate</h3>
              <p className='book-author'>Julian Thorne</p>
              <p className='book-price'>$28.50</p>
            </div>

            {/* Book Card 3 */}
            <div className='book-card'>
              <div className='book-image-wrapper'>
                <img 
                  alt='Modern Fiction' 
                  className='book-image'
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuDw2qfmnXzRrjoL08xJzxlkZPrlXlOFMS7axYX7wb_JiuYPrB0AjWEudinofQCkehtfdTgQ5CSQPc2AlEAEKzb-OVbMqDhMHPSm7LM1u7Kuhq9Wtdyw1h2LgR7wyDpb0NyaR-VRgotS5Hhr7_7ce0Ah_cqO6_ngSsRmYfnrvFM7VHhHPdJImx4SV-KzFpBHxOzu6FhkMQebEziNMn3INF3xWCS7ay8fdkqNSzvcdFkrdB_R6t9l6X4-Jci_s8FzZFAbhRsjcDt713Vw'
                />
              </div>
              <span className='book-category'>Contemporary</span>
              <h3 className='book-title'>The Urban Solace</h3>
              <p className='book-author'>Marcus Vane</p>
              <p className='book-price'>$24.00</p>
            </div>

            {/* Book Card 4 */}
            <div className='book-card'>
              <div className='book-image-wrapper'>
                <img 
                  alt='Journal Style' 
                  className='book-image'
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuA3vPLMpFIWNeFgZd5zUrdf8kpBT-VVIvCUqJRCsbkfuokOQ88yyFv-72sf0DuD8DsIPUpKJ2wNq8nOYjBUOcr6jIpBQSa8RCayjP-LWKaG0aRFTmo06ugyg4XCKlPCrhsk3yvSPzmyiD0qVerIseiTiHHBKj0iC8VKuccMbiqsSgjgYs33ZmjJxqKsY0vcUy_nQCHm0kF41WkhLA92tWePixwxS4JFLKKl7piDuOno7hRUmB-Tgeb4o87Hq0KO7AqTvFVJetP_UDA4'
                />
              </div>
              <span className='book-category'>Limited Edition</span>
              <h3 className='book-title'>Archival Thoughts Vol. II</h3>
              <p className='book-author'>Ink & Archive Press</p>
              <p className='book-price'>$45.00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className='offers-section'>
        <div className='offers-container'>
          <div className='offers-header'>
            <h2 className='offers-title'>On Sale</h2>
            <span className='offers-badge'>Limited Time</span>
          </div>

          <div className='offers-grid'>
            <div className='offer-card'>
              <div className='offer-image'>
                <img 
                  alt='Sale Book 1' 
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuDN8in3fD0-sajw06u_wFrquWR-nnSFKwZ98WozjFv42R33cdx4bSepZ6cgIEw810rtP43_JtjUh6b59h4g8yk-0wFTM3SoiBWJPEt6Tb7ymDl5UkNROoXqi9qna_zQHhfZWNiXUihzOql1zcKJgkBAe5R7SbBRdVrOuxZ_sdMs_iHdYd4Ms7NdfqMDEakmKLSLLViXZ-nR8c0e86l-4tRhTwGqE6u2oLfswNhxVN0uzj7xCzUPkqjKZXo1fucI9pIvN-qS57jL1eK6'
                />
              </div>
              <div className='offer-content'>
                <h3 className='offer-book-title'>Poetry in the Wild</h3>
                <p className='offer-author'>Sarah Jenkins</p>
                <div className='offer-price'>
                  <span className='offer-current-price'>$18.00</span>
                  <span className='offer-original-price'>$26.00</span>
                </div>
                <button className='offer-button'>Add to Cart</button>
              </div>
            </div>

            <div className='offer-card'>
              <div className='offer-image'>
                <img 
                  alt='Sale Book 2' 
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuDOyk0-0exvBpCUYeprfoXLsb_pEBuKBwyGtHhjJvOyv_wEru2MP138MPEwuUCkkOpoziXGIRJ4S838DTYRkL3plF8k0fER73vbc3cSziWHbRaMl6WID7OArGzY1fL-cjNSHKlwphjqGXoosllNPR4lXwgwuVF0PeqSkwjFmAl4btlM7HzWpwoZ-156-CHi-tZhnb4w-jftroHi2UxvSlqrxlgdAPOmm3TfLkbjwQjOvT5kqEV13FiVR4dFVR0UT5xXGWSJf7PRXm2s'
                />
              </div>
              <div className='offer-content'>
                <h3 className='offer-book-title'>The Botanist's Journal</h3>
                <p className='offer-author'>Dr. Arthur Penhaligon</p>
                <div className='offer-price'>
                  <span className='offer-current-price'>$22.00</span>
                  <span className='offer-original-price'>$35.00</span>
                </div>
                <button className='offer-button'>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className='newsletter-section'>
        <div className='newsletter-container'>
          <div className='newsletter-content'>
            <h2 className='newsletter-title'>Join the Literary Circle</h2>
            <p className='newsletter-description'>
              Receive monthly dispatches on new arrivals, author interviews, and exclusive archival releases.
            </p>
            <form className='newsletter-form' onSubmit={(e) => e.preventDefault()}>
              <input 
                className='newsletter-input'
                placeholder='Your email address'
                type='email'
              />
              <button type='submit' className='newsletter-button'>Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;