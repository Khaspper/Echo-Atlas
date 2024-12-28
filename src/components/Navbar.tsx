import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className=" p-4 flex justify-between">
      {/* Todo: I have to fix the links for these */}
      {/* Todo: I also have to add the boxes */}
      {/* For the 3D Buttons watch this video */}
      {/* https://www.youtube.com/watch?v=svIgDeO0CQU&t=432s */}
      {/* I think I want to change these to buttons like the ones in quickdraw.com */}
      <div className="flex gap-20 mx-20 items-center">
        <button className='w-auto h-8 bg-violet-500 flex items-center justify-center text-xl text-white px-4'>
          Orpheus
        </button>
        
        <button className="w-8 h-8 bg-pink-500 flex items-center justify-center text-xl text-white">
          ?
        </button>
      </div>

      <div className="flex gap-20 mx-20">
        <button
          className="w-16 h-16  shadow-md flex justify-center items-center"
          aria-label="GitHub"
        >
          {/* Insert GitHub SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            viewBox="0 0 256 256"
            fill="none"
          >
            <g fill="#000000">
              <path d="M0,256v-256h256v256z" />
            </g>
            <g fill="#ffffff">
              <g transform="scale(5.12,5.12)">
                <path d="M17.791,46.836c0.711,-0.306 1.209,-1.013 1.209,-1.836v-5.4c0,-0.197 0.016,-0.402 0.041,-0.61c-0.014,0.004 -0.027,0.007 -0.041,0.01c0,0 -3,0 -3.6,0c-1.5,0 -2.8,-0.6 -3.4,-1.8c-0.7,-1.3 -1,-3.5 -2.8,-4.7c-0.3,-0.2 -0.1,-0.5 0.5,-0.5c0.6,0.1 1.9,0.9 2.7,2c0.9,1.1 1.8,2 3.4,2c2.487,0 3.82,-0.125 4.622,-0.555c0.934,-1.389 2.227,-2.445 3.578,-2.445v-0.025c-5.668,-0.182 -9.289,-2.066 -10.975,-4.975c-3.665,0.042 -6.856,0.405 -8.677,0.707c-0.058,-0.327 -0.108,-0.656 -0.151,-0.987c1.797,-0.296 4.843,-0.647 8.345,-0.714c-0.112,-0.276 -0.209,-0.559 -0.291,-0.849c-3.511,-0.178 -6.541,-0.039 -8.187,0.097c-0.02,-0.332 -0.047,-0.663 -0.051,-0.999c1.649,-0.135 4.597,-0.27 8.018,-0.111c-0.079,-0.5 -0.13,-1.011 -0.13,-1.543c0,-1.7 0.6,-3.5 1.7,-5c-0.5,-1.7 -1.2,-5.3 0.2,-6.6c2.7,0 4.6,1.3 5.5,2.1c1.699,-0.701 3.599,-1.101 5.699,-1.101c2.1,0 4,0.4 5.6,1.1c0.9,-0.8 2.8,-2.1 5.5,-2.1c1.5,1.4 0.7,5 0.2,6.6c1.1,1.5 1.7,3.2 1.6,5c0,0.484 -0.045,0.951 -0.11,1.409c3.499,-0.172 6.527,-0.034 8.204,0.102c-0.002,0.337 -0.033,0.666 -0.051,0.999c-1.671,-0.138 -4.775,-0.28 -8.359,-0.089c-0.089,0.336 -0.197,0.663 -0.325,0.98c3.546,0.046 6.665,0.389 8.548,0.689c-0.043,0.332 -0.093,0.661 -0.151,0.987c-1.912,-0.306 -5.171,-0.664 -8.879,-0.682c-1.665,2.878 -5.22,4.755 -10.777,4.974v0.031c2.6,0 5,3.9 5,6.6v5.4c0,0.823 0.498,1.53 1.209,1.836c9.161,-3.032 15.791,-11.672 15.791,-21.836c0,-12.682 -10.317,-23 -23,-23c-12.683,0 -23,10.318 -23,23c0,10.164 6.63,18.804 15.791,21.836z" />
              </g>
            </g>
          </svg>
        </button>
        
        <button
          className="w-16 h-16 shadow-md flex justify-center items-center transform hover:scale-105 transition"
          aria-label="LinkedIn"
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          viewBox="0 0 256 256"
          fill="none"
        >
          <g transform="translate(-98.56,-98.56) scale(1.77,1.77)">
            <g fill="#195b85">
              <g transform="scale(3.55556,3.55556)">
                <path d="M46.603,14c10.57,0 11.397,0.827 11.397,11.397v21.277c0,10.504 -0.822,11.326 -11.326,11.326h-21.348c-10.504,0 -11.326,-0.822 -11.326,-11.326v-21.348c0,-10.504 0.822,-11.326 11.326,-11.326zM30.202,44.705v-13.389h-4.161v13.389zM28.122,29.401c1.337,0 2.425,-1.088 2.425,-2.426c0,-1.337 -1.088,-2.425 -2.425,-2.425c-1.34,0 -2.426,1.086 -2.426,2.425c0,1.339 1.084,2.426 2.426,2.426zM45.812,44.705v-7.343c0,-3.605 -0.779,-6.378 -4.992,-6.378c-2.024,0 -3.381,1.11 -3.937,2.162h-0.056v-1.829h-3.992v13.389h4.158v-6.624c0,-1.746 0.333,-3.437 2.498,-3.437c2.134,0 2.162,1.997 2.162,3.55v6.511h4.159z" />
              </g>
            </g>
          </g>
        </svg>
        </button>
        <button
          className="w-16 h-16  rounded shadow-md flex justify-center items-center transform hover:scale-105 transition"
          aria-label="Gmail"
        >
          {/* Insert Gmail SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            viewBox="0 0 256 256"
            fill="none"
          >
            <g transform="translate(25.6,25.6) scale(0.8,0.8)">
              <g fill="#303030">
                <path d="M-32,288v-320h320v320z" />
              </g>
              <g>
                <g transform="scale(5.33333,5.33333)">
                  <path d="M45,16.2l-5,2.75l-5,4.75v16.3h7c1.657,0 3,-1.343 3,-3z" fill="#4caf50" />
                  <path d="M3,16.2l3.614,1.71l6.386,5.79v16.3h-7c-1.657,0 -3,-1.343 -3,-3z" fill="#1e88e5" />
                  <path
                    d="M35,11.2l-11,8.25l-11,-8.25l-1,5.8l1,6.7l11,8.25l11,-8.25l1,-6.7z"
                    fill="#e53935"
                  />
                  <path
                    d="M3,12.298v3.902l10,7.5v-12.5l-3.124,-2.341c-0.744,-0.558 -1.648,-0.859 -2.578,-0.859v0c-2.374,0 -4.298,1.924 -4.298,4.298z"
                    fill="#c62828"
                  />
                  <path
                    d="M45,12.298v3.902l-10,7.5v-12.5l3.124,-2.341c0.744,-0.558 1.648,-0.859 2.578,-0.859v0c2.374,0 4.298,1.924 4.298,4.298z"
                    fill="#fbc02d"
                  />
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>

      {/* Idk what to put here when people click on the email */}
    </nav>
  );
};

export default Navbar;
