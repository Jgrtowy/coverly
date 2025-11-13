import DarkVeil from "~/components/DarkVeil";
import Landing from "~/components/Landing";

export default function Home() {
    return (
        <main className="w-screen h-dvh relative">
            <div className="w-full h-full absolute left-0 top-0 -z-10">
                <DarkVeil />
            </div>
            <Landing />
        </main>
    );
}
