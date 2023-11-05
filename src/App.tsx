import { useEffect, useState } from "react";
import UsefulViewer from "./UsefulViewer";

export default function App() {
  const [value, setValue] = useState({});
  console.count('render');
  useEffect(() => {
    async function api() {
      const res = await fetch("https://dummyjson.com/products/1");
      const json = await res.json();
      setValue(json);
    }
    api();
  }, []);

  return <UsefulViewer value={value} onChange={setValue} />;
}
