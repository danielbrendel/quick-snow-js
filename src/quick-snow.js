module.exports = class QuickSnow
{
    flakes = [];
    snowTarget = null;
    snowContext = null; 
	cfg = {};
	handle = null;

    constructor(selector, config = {})
    {
		this.cfg = config;
		
		if (typeof this.cfg.count === 'undefined') {
			this.cfg.count = 100;
		}
		
		if (typeof this.cfg.color === 'undefined') {
			this.cfg.color = 'rgb(250, 250, 250)';
		}
		
		if (typeof this.cfg.speed === 'undefined') {
			this.cfg.speed = 1.0;
		}
		
		if (typeof this.cfg.before === 'undefined') {
			this.cfg.before = true;
		}
		
		this.init(selector);
	}
	
	init(selector)
	{
		let target = document.querySelector(selector);
		if (target) {
			this.snowTarget = document.createElement("canvas");
			this.snowTarget.width = target.clientWidth;
			this.snowTarget.height = target.clientHeight;
			this.snowTarget.style.position = 'absolute';
			
			if (this.cfg.before) {
				target.insertBefore(this.snowTarget, target.firstChild);
			} else {
				target.appendChild(this.snowTarget);
			}
			
			window.addEventListener('resize', function() {
				this.snowTarget.width = target.clientWidth;
				this.snowTarget.height = target.clientHeight;
			});
			
			this.snowContext = this.snowTarget.getContext("2d");
			
			for (let i = 0; i < this.cfg.count; i++) {
				let color = this.cfg.color;
				if (color === 'random') {
					color = 'rgb(' + (Math.floor(Math.random() * 255)).toString() + ', ' + (Math.floor(Math.random() * 255)).toString() + ', ' + (Math.floor(Math.random() * 255)).toString() + ')';
				}
			
				this.flakes.push({
					x: Math.floor(Math.random() * this.snowTarget.width),
					y: Math.floor(Math.random() * this.snowTarget.height),
					size: Math.floor(Math.random() * 3) + 1,
					speed: (Math.floor(Math.random() * 10) + 1) * this.cfg.speed,
					color: color 
				});
			}
		} else {
			console.error('Invalid selector');
		}
	}

	draw()
	{
		this.snowContext.clearRect(0, 0, this.snowTarget.clientWidth, this.snowTarget.clientHeight);
		
		for (let i = 0; i < this.flakes.length; i++) {
			let flake = this.flakes[i];
			
			this.snowContext.beginPath();
			this.snowContext.fillStyle = flake.color;
			this.snowContext.arc(flake.x, flake.y, flake.size, 0 * Math.PI, 2 * Math.PI);
			this.snowContext.fill();
			
			flake.y += flake.speed;
			
			if (flake.y >= this.snowTarget.height + 20) {
				flake.y = 0;
			}
		}
	}

	start()
	{
		this.handle = setInterval(this.draw.bind(this), 100);
	}
	
	stop()
	{
		if (this.handle) {
			clearInterval(this.handle);
			this.snowContext.clearRect(0, 0, this.snowTarget.clientWidth, this.snowTarget.clientHeight);
			this.handle = null;
		}
	}
}

