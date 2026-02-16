import ZigZagList from "../components/ZigZagList";
import { experience } from "../data/experience";

export default function WorkPage() {
  return (
    <section className="content-page" aria-label="Work">
      <h1>Work</h1>
      <ZigZagList items={experience} />
    </section>
  );
}
