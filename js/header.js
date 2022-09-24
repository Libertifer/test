const headerElement = (
	<>
		<h1><a href="/">Korppi's Jukebox</a></h1>
		<nav>
			<a href="jukebox">Royalty-free music</a>
			<a href="contact">Contact</a>
			<a href="donate">Donate</a>
			<a href="faq">FAQ</a>
		</nav>
	</>
);
const header = ReactDOM.createRoot(document.getElementById('header'));
header.render(headerElement);
