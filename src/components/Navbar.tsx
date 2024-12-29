import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className=" p-4 flex justify-between">
      {/* Todo: I have to fix the links for these */}
      {/* Todo: I also have to add the boxes */}
      {/* For the 3D Buttons watch this video */}
      {/* https://www.youtube.com/watch?v=svIgDeO0CQU&t=432s */}
      {/* I think I want to change these to buttons like the ones in quickdraw.com */}

      {/* Orpheus */}
      <div className="flex gap-20 mx-20 items-center">
        <button onClick={() => router.push('/')} className='button w-40 h-12 bg-violet-500 rounded-lg cursor-pointer select-none
          active:translate-y-2  active:[box-shadow:0_0px_0_0_#701bf8,0_0px_0_0_#1b70f841]
          active:border-b-[0px]
          transition-all duration-150 [box-shadow:0_10px_0_0_#701bf8,0_15px_0_0_#1b70f841]
          border-b-[1px] border-violet-400
        '>
          <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>
            Orpheus
          </span>
        </button>

        {/* About Page */}
        <button onClick={() => router.push('/about')} className='button w-16 h-12 bg-pink-500 rounded-lg cursor-pointer select-none
          active:translate-y-2  active:[box-shadow:0_0px_0_0_#c9148d,0_0px_0_0_#1b70f841]
          active:border-b-[0px]
          transition-all duration-150 [box-shadow:0_10px_0_0_#c9148d,0_15px_0_0_#1b70f841]
          border-b-[1px] border-pink-400
        '>
          <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>
            ?
          </span>
        </button>
      </div>

      <div className="flex gap-20 mx-20">

        {/* GitHub Page */}
        <button onClick={() => window.open('https://github.com/Khaspper/Echo-Atlas', '_blank')} className='button w-16 h-12 bg-[#020617] rounded-lg cursor-pointer select-none
          active:translate-y-2  active:[box-shadow:0_0px_0_0_#3d3c3c,0_0px_0_0_#1b70f841]
          active:border-b-[0px]
          transition-all duration-150 [box-shadow:0_10px_0_0_#3d3c3c,0_15px_0_0_#1b70f841]
          border-b-[1px]
        '>
          <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>
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
          </span>
        </button>

        {/* LinkedIn Page */}
        <button onClick={() => window.open('https://www.linkedin.com/in/mark-narciso-79a030247/', '_blank')} className='button w-16 h-12 bg-[#0288D1] rounded-lg cursor-pointer select-none
          active:translate-y-2 active:[box-shadow:0_0px_0_0_#0267ba,0_0px_0_0_#1b70f841]
          active:border-b-[0px]
          transition-all duration-150 [box-shadow:0_10px_0_0_#0267ba,0_15px_0_0_#1b70f841]
          border-b-[1px]'
        >
          <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24"
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                fill="#0288D1"
                d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
              ></path>
              <path
                fill="#FFF"
                d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
              ></path>
            </svg>
          </span>
        </button>

        {/* I don't know if I want this at all LOL */}
        {/* Gmail */}
        {/* <button onClick={() => router.push('/about')} className='button w-16 h-12 bg-[#4a4d4d] rounded-lg cursor-pointer select-none
          active:translate-y-2 active:[box-shadow:0_0px_0_0_#141414,0_0px_0_0_#1b70f841]
          active:border-b-[0px]
          transition-all duration-150 [box-shadow:0_10px_0_0_#141414,0_15px_0_0_#1b70f841]
          border-b-[1px]'
        >
          <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24"
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                fill="#4caf50"
                d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
              ></path>
              <path
                fill="#1e88e5"
                d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
              ></path>
              <polygon
                fill="#e53935"
                points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
              ></polygon>
              <path
                fill="#c62828"
                d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
              ></path>
              <path
                fill="#fbc02d"
                d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
              ></path>
            </svg>
          </span>
        </button> */}
      </div>

      {/* Idk what to put here when people click on the email */}
    </nav>
  );
};

export default Navbar;
