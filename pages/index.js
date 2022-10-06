import Head from 'next/head';
import Minting from '../components/Minting'
import Image from 'next/Image';
import Link from 'next/link';

import morningBG from '../../pagemint/public/imgs/Morning/morning.webp';
import rednightBG from '../../pagemint/public/imgs/Rednight/rednight.webp';
import sunsetBG from '../../pagemint/public/imgs/Sunset/sunset.webp';
import nightBG from '../../pagemint/public/imgs/Night/night.webp';
import homePNG from '../assets/home.png';

import dcImg from '../../pagemint/public/imgs/discord.png';
import twImg from '../../pagemint/public/imgs/twitter.png';

let setLogoBgSrc;

let hours = {
  timeZone: 'Africa/Accra',
  hour: 'numeric',
  hour12: false
},
hrsFormatter = new Intl.DateTimeFormat([], hours);

var utcHour = hrsFormatter.format(new Date()) ;

if(utcHour==0 || utcHour==24){
  setLogoBgSrc = rednightBG;
}
if(utcHour>=1 && utcHour<=4 ){
  setLogoBgSrc = rednightBG;
}
if(utcHour>=5 && utcHour<=11){
  setLogoBgSrc = morningBG;
}
if(utcHour>=12 && utcHour<=17){
  setLogoBgSrc = sunsetBG;
}
if(utcHour >= 18 && utcHour<=23){
  setLogoBgSrc = nightBG;
}

export default function Home() {
  return (
    <div className=' relative px-[10px] h-full w-full'>
      <Head>
        <title>CXGNUS</title>
        <link rel="shortcut icon" href='/logo.ico' />
      </Head>

      <style jsx>{`
            .homeBTN {
              -webkit-filter: drop-shadow(-5px 5px red);
              transition: all .5s ease;
              z-index: 99;
            }
            .homeBTN:hover{
              -webkit-filter: drop-shadow(-3px 3px yellow);
              transition: all 5.s ease;
            }
      `}</style>  

      <Link className='m-auto' href="https://www.studiocxgnus.com"  passHref>
        <a>
          <div className='homeBTN fixed top-[15px] left-[15px] h-[auto] w-[125px] '>
            <Image src={homePNG} />
          </div>
        </a>
      </Link>

      <Minting  />

      <div className='fixed flex top-0 left-0 right-0 bottom-0 -z-10 
      
      '>
        <Image className='blur-sm contrast-[1.2] brightness-75 object-cover'
        src={setLogoBgSrc}
       />
      </div>


      <div className='
      fixed
      bottom-0
      left-0
      h-full
      w-full
      flex
      flex-row
      justify-center
      items-end
      gap-5
      
      md:items-start
      md:justify-center
      md:flex-col -z-1'
      >

      <Link className='m-auto' href="https://discord.com/invite/sVsdPmFHsy"  passHref>
        <a target="_blank">
          <div className=' h-[50px] w-[50px] m-auto hover:scale-[0.95] transition-all ease-in-out'>
            <Image  src={dcImg}/>
          </div>
        </a>
      </Link>
       
      <Link className='m-auto' href="https://twitter.com/cxgnusnft"  passHref>
        <a target="_blank">
          <div className=' h-[50px] w-[50px] m-auto hover:scale-[0.95] transition-all ease-in-out'>
            <Image  src={twImg}/>
          </div>
        </a>
      </Link>
      </div>
     </div>
  );
}