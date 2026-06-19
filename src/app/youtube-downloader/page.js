import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DownloadForm from '@/components/DownloadForm';
import { Metadata } from 'next';

export const metadata = {
  title: 'YouTube Video Downloader - Fast & Free | Skillz Download',
  description: 'Download YouTube videos quickly and easily in HD, MP4, and MP3 formats for free. Fast, secure, and requires no software installation.',
};

export default function YouTubeDownloaderPage() {
  return (
    <div className="page-wrapper bg-dot-pattern" style={{ minHeight: '100vh', background: 'var(--gray-950)' }}>
      <Header />
      
      <main className="flex-grow text-white">
        {/* Hero Section */}
        <section className="hero" style={{ 
          padding: '120px 24px 100px', 
          backgroundImage: 'linear-gradient(rgba(15, 17, 21, 0.85), rgba(15, 17, 21, 0.95)), url("/img/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}>
          <div className="animate-fade-in-up">
            <span className="hero-badge" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderColor: 'var(--gray-800)', color: 'var(--primary-500)' }}>
              <img src="/img/youtube-svgrepo-com.svg" alt="YouTube Logo" width="16" height="16" style={{ filter: 'brightness(0) saturate(100%) invert(39%) sepia(93%) saturate(3070%) hue-rotate(345deg) brightness(101%) contrast(105%)' }} />
              Free YouTube Downloader
            </span>
          </div>

          <h1 className="animate-fade-in-up delay-1" style={{ maxWidth: '900px', margin: '0 auto 24px', fontWeight: 800 }}>
            Download YouTube Videos<br/>
            <span style={{ color: 'var(--primary-500)' }}>Instantly.</span>
          </h1>

          <p className="animate-fade-in-up delay-2" style={{ maxWidth: '600px', margin: '0 auto 48px', fontSize: '1.2rem', color: 'var(--gray-300)' }}>
            The fastest way to save your favorite YouTube videos in HD quality. No registration, no limits, completely free.
          </p>

          <DownloadForm platformName="YouTube" placeholder="Paste your YouTube video URL here..." />
        </section>

        {/* Disclaimer Banner */}
        <div style={{ background: '#111111', borderBottom: '1px solid var(--gray-800)', padding: '16px 0' }}>
          <div className="container mx-auto px-4 text-center">
            <p style={{ color: 'var(--gray-400)', fontSize: '0.85rem', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <strong>Disclaimer:</strong> This tool is for personal use only. Please respect the copyright of the content creators. Do not download copyrighted material without permission.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-16 container mx-auto px-4 max-w-4xl" style={{ color: 'var(--gray-400)' }}>
          {/* Ad Slot 1 */}
          <div style={{ width: '100%', height: '90px', background: '#111111', border: '1px solid var(--gray-800)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-600)', marginBottom: '48px' }}>
            <span>Ad Placeholder</span>
          </div>

          <article className="space-y-8" style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '24px', letterSpacing: '-0.02em' }}>The Ultimate YouTube Video Downloader</h2>
            <p>
              In today's fast-paced digital landscape, video content has undeniably become the primary medium through which we consume information, entertainment, and education. With billions of hours of content watched daily on YouTube, it stands as the absolute titan of digital video platforms. It is the go-to repository for everything from full-length documentaries, educational lectures, and DIY tutorials to music videos, gaming streams, and vlogs. However, our ability to access this vast treasure trove of content is constantly gated by one crucial factor: internet connectivity. Internet connections are not universally reliable, and comprehensive data plans can be expensive or restrictive, especially when traveling or commuting. This is precisely why a robust, reliable, and versatile YouTube Video Downloader becomes an absolutely essential tool for the modern internet user. Skillz Download offers the most efficient, user-friendly, and comprehensive solution for saving YouTube content directly to your device for seamless offline viewing.
            </p>
            <p>
              Whether you are an eager student looking to save a complex tutorial for offline reference, a music enthusiast wanting to download your favorite music videos for your daily commute, or a dedicated archivist seeking to curate a personal collection of your favorite creators' content, our YouTube downloader is meticulously engineered to meet and exceed all your needs. With comprehensive support for a multitude of formats including MP4, WebM, and MP3, alongside varying quality options up to stunning 4K resolution, you are granted complete autonomy over how you consume your media. The days of relying on a stable internet connection to watch your favorite videos are over. Let's delve deeply into exactly why our platform is universally recognized as the premier choice for all your YouTube downloading requirements, and how it can profoundly enhance your digital media consumption experience.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', margin: '40px 0' }}>
              <div style={{ background: '#111111', padding: '32px', borderRadius: '12px', border: '1px solid var(--gray-800)' }}>
                <div style={{ color: 'var(--primary-500)', marginBottom: '16px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'white', fontWeight: 700, marginBottom: '12px' }}>Lightning Fast Infrastructure</h3>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>Our advanced server infrastructure processes your download requests instantaneously. We utilize highly optimized algorithms to ensure that you can download even massive files in mere seconds, entirely eliminating frustrating wait times and buffering delays.</p>
              </div>
              <div style={{ background: '#111111', padding: '32px', borderRadius: '12px', border: '1px solid var(--gray-800)' }}>
                <div style={{ color: 'var(--primary-500)', marginBottom: '16px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'white', fontWeight: 700, marginBottom: '12px' }}>Uncompromising Security</h3>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>We fundamentally believe that security should never be an afterthought. Our platform guarantees no malware, no hidden software installations, and requires no personal registration. Your privacy, anonymity, and device security are our paramount priorities.</p>
              </div>
            </div>

            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', margin: '60px 0 24px', letterSpacing: '-0.02em' }}>Mastering the Art of Downloading YouTube Videos</h2>
            <p>
              We firmly believe that acquiring your favorite digital content should not require advanced technical skills or a degree in computer science. The user experience should be seamless, intuitive, and remarkably fast. We have painstakingly streamlined the entire downloading process to make it as universally accessible as possible, regardless of your technical proficiency. Follow these three remarkably simple steps to transform any online video into an offline asset:
            </p>
            <ol style={{ paddingLeft: '24px', margin: '24px 0' }}>
              <li style={{ marginBottom: '16px' }}>
                <strong style={{ color: 'white' }}>Acquire the Target URL:</strong> Begin by opening YouTube on your preferred web browser or via the official mobile application. Navigate to the specific video you wish to download. Locate the 'Share' icon (typically represented by a curved arrow), tap or click it, and select the 'Copy Link' option to save the URL to your device's clipboard.
              </li>
              <li style={{ marginBottom: '16px' }}>
                <strong style={{ color: 'white' }}>Input the URL into Our Downloader:</strong> Return to the Skillz Download YouTube Downloader interface. Locate the prominent input field situated at the top of the page. Paste the previously copied URL directly into this designated search box. Our system will immediately recognize the link and begin the parsing process.
              </li>
              <li style={{ marginBottom: '16px' }}>
                <strong style={{ color: 'white' }}>Select Preferences and Initiate Download:</strong> Once our servers have rapidly processed the video link, you will be presented with a comprehensive menu of format and quality options. These may range from ultra-high-definition 4K MP4 files to highly compressed audio-only MP3 formats. Carefully select the option that best aligns with your specific needs, and click the download button. The transfer to your local storage will commence immediately.
              </li>
            </ol>

            {/* Ad Slot 2 */}
            <div style={{ width: '100%', height: '90px', background: '#111111', border: '1px solid var(--gray-800)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-600)', margin: '48px 0' }}>
              <span>Ad Placeholder</span>
            </div>

            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', margin: '60px 0 24px', letterSpacing: '-0.02em' }}>The Compelling Reasons to Download YouTube Content</h2>
            
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', margin: '40px 0 16px' }}>Guaranteeing Uninterrupted Offline Viewing</h3>
            <p>
              Imagine being on a long-haul international flight, navigating a subterranean subway commute, or embarking on a remote camping trip where cellular reception is a distant memory. In these scenarios, relying on streaming services is an exercise in futility. Having your meticulously curated selection of favorite YouTube videos saved locally on your smartphone, tablet, or laptop means you absolutely never have to deal with the sheer frustration of incessant buffering or dreaded 'No Internet Connection' error messages. You are empowered to watch precisely what you want, precisely when you want, without maintaining an active tether to the internet. This capability transforms dead time into engaging entertainment or productive learning.
            </p>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', margin: '40px 0 16px' }}>Drastically Reducing Cellular Data Consumption</h3>
            <p>
              Streaming high-definition video, particularly at 1080p or 4K resolutions, consumes an extraordinarily massive amount of bandwidth. If you are operating under the constraints of a limited cellular data plan, casually watching YouTube while away from Wi-Fi can rapidly and disastrously deplete your monthly data allowance, resulting in throttled speeds or exorbitant overage charges. By proactively downloading your desired videos while securely connected to a robust, unmetered Wi-Fi network (such as at home or in an office), you can subsequently enjoy hours of uninterrupted, high-quality entertainment on the go without consuming a single megabyte of your precious cellular data.
            </p>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', margin: '40px 0 16px' }}>Facilitating Education and Content Archival</h3>
            <p>
              Beyond mere entertainment, YouTube functions as one of the most incredible educational resources ever compiled in human history. From intricate software coding tutorials and comprehensive language courses to intricate cooking classes and deeply researched historical documentaries, the platform is an absolute goldmine of knowledge. Downloading these invaluable resources allows you to study offline in distraction-free environments. It enables you to utilize specialized media players to carefully slow down playback during complex segments, loop critical instructions, and thoroughly digest the material at your own pace. Furthermore, the digital landscape is inherently ephemeral; videos are frequently removed due to copyright strikes, creator deletions, or platform policy changes. Downloading ensures that you possess a permanent, local archive of the content that matters most to you, safeguarding it against unexpected removal.
            </p>

            <div style={{ background: '#111111', padding: '40px', borderRadius: '16px', border: '1px solid var(--gray-800)', margin: '60px 0' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '16px' }}>Comprehensive Format and Quality Support</h2>
              <p style={{ color: 'var(--gray-400)', marginBottom: '32px' }}>
                Our highly versatile downloader has been engineered to support an incredibly wide array of multimedia formats, ensuring maximum compatibility across all conceivable devices and specific use cases.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <li style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-500)', fontWeight: 'bold', fontSize: '1.1rem', flexShrink: 0 }}>HD</div>
                  <div>
                    <strong style={{ color: 'white', display: 'block', marginBottom: '4px', fontSize: '1.2rem' }}>High-Definition Video Formats</strong>
                    <span style={{ color: 'var(--gray-400)' }}>We provide support for industry-standard video containers including MP4 and WebM. Depending on the source material, you can download files in breathtaking 4K, crystal-clear 1080p, standard 720p, or data-saving lower resolutions.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-500)', fontWeight: 'bold', fontSize: '1.1rem', flexShrink: 0 }}>HQ</div>
                  <div>
                    <strong style={{ color: 'white', display: 'block', marginBottom: '4px', fontSize: '1.2rem' }}>High-Fidelity Audio Formats</strong>
                    <span style={{ color: 'var(--gray-400)' }}>For users who only require the auditory component of a video—such as music tracks, podcasts, or lectures—we offer seamless extraction to MP3, M4A, and WEBM audio formats, supporting bitrates up to a pristine 320kbps for audiophile-grade quality.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-500)', fontWeight: 'bold', fontSize: '1.1rem', flexShrink: 0 }}>All</div>
                  <div>
                    <strong style={{ color: 'white', display: 'block', marginBottom: '4px', fontSize: '1.2rem' }}>Universal Device Compatibility</strong>
                    <span style={{ color: 'var(--gray-400)' }}>Files downloaded through our platform are universally compatible. Whether you are operating on a Windows PC, an Apple Mac, a Linux distribution, an iOS iPhone or iPad, or any Android smartphone or tablet, your media will play flawlessly.</span>
                  </div>
                </li>
              </ul>
            </div>

            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', margin: '60px 0 24px', letterSpacing: '-0.02em' }}>Frequently Asked Questions (FAQ)</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#111111', padding: '32px', borderRadius: '12px', border: '1px solid var(--gray-800)' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'white', fontWeight: 700, margin: '0 0 12px 0' }}>Is the Skillz Download YouTube Downloader truly free to use?</h3>
                <p style={{ margin: 0, color: 'var(--gray-400)' }}>Yes, our sophisticated tool is 100% completely free for all users. We firmly oppose the bait-and-switch tactics common in this industry. There are absolutely no hidden processing fees, no mandatory premium subscription tiers that unlock essential features, and absolutely no artificial limits imposed on how many videos you are permitted to download in a given day. Our service is fully supported by unintrusive advertisements, allowing us to offer premium functionality to you at zero cost.</p>
              </div>
              
              <div style={{ background: '#111111', padding: '32px', borderRadius: '12px', border: '1px solid var(--gray-800)' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'white', fontWeight: 700, margin: '0 0 12px 0' }}>What are the legal implications of downloading YouTube videos?</h3>
                <p style={{ margin: 0, color: 'var(--gray-400)' }}>The legality of downloading digital content is a nuanced topic. Generally speaking, downloading publicly available videos strictly for personal, non-commercial, offline use falls under the doctrine of 'fair use' in many jurisdictions. However, you are strictly prohibited from downloading copyrighted material with the intention of redistributing it, uploading it to other platforms, modifying it for your own gain, or monetizing it without securing explicit, written permission from the original content creator and copyright holder. We implore all users to stringently respect copyright laws and the hard work of digital creators.</p>
              </div>
              
              <div style={{ background: '#111111', padding: '32px', borderRadius: '12px', border: '1px solid var(--gray-800)' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'white', fontWeight: 700, margin: '0 0 12px 0' }}>Can I utilize this downloader directly on my iPhone or Android mobile device?</h3>
                <p style={{ margin: 0, color: 'var(--gray-400)' }}>Absolutely! We recognize that mobile devices are the primary computing platform for a vast majority of users. Therefore, our platform has been rigorously designed to be fully responsive. It functions flawlessly directly within your preferred mobile web browser. You are not required to navigate complex app stores or risk installing potentially unsafe third-party applications. Simply visit our website using Safari, Google Chrome, Mozilla Firefox, or any other modern mobile browser, and you will experience the exact same powerful functionality as desktop users.</p>
              </div>

              <div style={{ background: '#111111', padding: '32px', borderRadius: '12px', border: '1px solid var(--gray-800)' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'white', fontWeight: 700, margin: '0 0 12px 0' }}>Why do some ultra-high-definition (4K) videos sometimes download without an audio track?</h3>
                <p style={{ margin: 0, color: 'var(--gray-400)' }}>This is a common technical quirk inherent to how YouTube delivers high-resolution content. To significantly optimize bandwidth and server load, YouTube natively stores its highest-resolution video streams (such as 1080p, 1440p, and 4K) entirely separate from the accompanying audio streams. Our intelligent downloader engine works diligently to 'mux' (meaning multiplex, or seamlessly combine) these disparate video and audio streams together on the fly as you download. However, in certain complex edge cases, this automatic process may encounter difficulties. If you experience this, you simply need to review the available download links and deliberately select a specifically 'muxed' option, which guarantees both sight and sound.</p>
              </div>
              
              <div style={{ background: '#111111', padding: '32px', borderRadius: '12px', border: '1px solid var(--gray-800)' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'white', fontWeight: 700, margin: '0 0 12px 0' }}>How long does it typically take to download a standard-length video?</h3>
                <p style={{ margin: 0, color: 'var(--gray-400)' }}>The duration of a download is entirely contingent upon three primary variables: the overall length of the source video, the specific resolution and quality you have chosen (a 4K file is exponentially larger than a 360p file), and the inherent speed of your personal internet connection. That being said, our backend servers are highly optimized for maximum throughput. Assuming you possess a reasonably fast broadband connection, a standard 5-minute music video in 1080p resolution should successfully download in significantly less than a minute.</p>
              </div>
            </div>

            {/* Ad Slot 3 */}
            <div style={{ width: '100%', height: '90px', background: '#111111', border: '1px solid var(--gray-800)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-600)', margin: '48px 0' }}>
              <span>Ad Placeholder</span>
            </div>

            <div style={{ background: '#151515', border: '1px solid var(--gray-800)', padding: '60px 40px', borderRadius: '16px', margin: '60px 0', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '16px' }}>Ready to Start Downloading?</h2>
              <p style={{ color: 'var(--gray-400)', fontSize: '1.1rem', marginBottom: '32px', maxWidth: '800px', mx: 'auto', lineHeight: 1.8 }}>
                Experience the profound freedom of having your absolute favorite digital content available at your fingertips, whenever and wherever you need it. Try the Skillz Download YouTube Video Downloader today and join the ranks of millions of satisfied users who have successfully streamlined their offline media consumption habits. Fast, undeniably free, and incredibly reliable – it firmly stands as the ultimate utility tool for the modern, discerning internet user. Scroll back to the top of the page, paste your URL, and unlock a world of offline entertainment!
              </p>
            </div>

          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}
