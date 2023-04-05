import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [summarizedtext, setsummarizedtext] = useState("");
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: "your_api",
  });
  const openai = new OpenAIApi(configuration);

  const HandleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(text),
        temperature: 0.6,
        max_tokens: 1000,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setsummarizedtext(res?.data?.choices[0]?.text);
        }
      })
      .catch((err) => {
        console.log(err, "An error occured");
      });
  };

  function generatePrompt(text) {
    return `Summarize this ${text}. and break them into seperate lines`;
  }

  return (
    <div className="App_">
      <div className="header">
        <h1 className="header_text">
          Metin <span className="text_active">Özetleyici</span>
        </h1>
        <h2 className="header_summary">
          {" "}
          Metninizi daha kısa bir uzunlukta özetleyin..
        </h2>
      </div>
      <div className="container">
        <div className="text_form">
          <form>
            <label>Metninizi buraya yazın/yapıştırın</label>
            <textarea
              rows={14}
              cols={80}
              placeholder="Metninizi buaraya yazın"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </form>
        </div>
        <div>
          <button type="button" onClick={HandleSubmit}>
            {loading ? "yükleniyor..." : "Özetle"}
          </button>
        </div>
        <div className="summarized_text">
          <label>Özetlenmiş Metin</label>
          <textarea
            placeholder="Özetlenmiş Metin"
            cols={80}
            rows={14}
            value={summarizedtext}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
