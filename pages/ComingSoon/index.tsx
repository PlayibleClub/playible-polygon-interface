import Image from 'next/image';

export default function ComingSoonPage() {
  return (
    <div className="select-none flex w-full h-screen justify-center bg-gradient-to-b from-darkblue to-lightblue">
      <div className="w-3/4 flex flex-col h-screen justify-center items-center gap-4 pb-48">
        <div className="flex flex-row gap-4 content-between font-monument text-4xl">
          <Image width={53} height={63} src="/images/logo.png" alt="playible logo" />
          <div className="pt-3 text-indigo-white">PLAYIBLE</div>
        </div>
        <div className="text-7xl text-indigo-white">X</div>
        <div className="flex flex-row gap-4 content-between font-monument text-4xl">
          <Image width={300} height={200} src="/images/polygon_logo.png" alt="playible logo" />
        </div>
        <div className="text-7xl text-indigo-white font-monument mt-14">COMING SOON</div>
      </div>
    </div>
  );
}
