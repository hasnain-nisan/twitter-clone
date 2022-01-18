import React, {useState, useRef} from 'react'
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import {
  MdCancel,
  MdImage,
  MdBarChart,
  MdInsertEmoticon,
  MdDateRange,
} from "react-icons/md";

const Input = () => {

    const [input, setInput] = useState("")
    const [selectedFile, setSelectedFile] = useState(false)
    const [showEmojis, setShowEmojis] = useState(false)
    const [loading, setLoading] = useState(false)

    const filePickerRef = useRef()

    const sendPost = () => {
        if(loading) return;
        setLoading(true)

        // const docRef
    };

    const addImageToPost = () => {
    }

    const addEmoji = (e) => {
      let sym = e.unified.split("-");
      let codesArray = [];
      sym.forEach((el) => codesArray.push("0x" + el));
      let emoji = String.fromCodePoint(...codesArray);
      setInput(input + emoji);
    };

    return (
      <div
        className={`border-b border-gray-700 p-3 flex items-start space-x-3`}
      >
        <img
          src="https://source.unsplash.com/random/1600*900/?profile"
          alt=""
          className="h-11 w-11 rounded-full cursor-pointer"
        />
        <div className="w-full divide-y divide-gray-700">
          <div className={`${selectedFile && 'pb-7'} ${input && 'space-y-2.5'}`}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={2}
              placeholder="What's happening?"
              className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
            />

            {selectedFile && (
              <div className="relative">
                <div className="absolute w-8 h-8 bg-[#15181C] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer">
                  <MdCancel
                    className="text-white h-6 w-6"
                    onClick={() => setSelectedFile(null)}
                  />
                </div>
                <img
                  src={selectedFile}
                  alt={`selected-file`}
                  className="rounded-2xl max-h-80 object-contain "
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div
                className="icon"
                onClick={() => filePickerRef.current.click()}
              >
                <MdImage className="h-[22px] text-[#1d9bf0]" />
                <input
                  type="file"
                  className="hidden"
                  ref={filePickerRef}
                  onChange={addImageToPost}
                />
              </div>
              <div className="icon rotate-90">
                <MdBarChart className="h-[22px] text-[#1d9bf0]" />
              </div>
              <div
                className="icon"
                onClick={() => setShowEmojis(!showEmojis)}
              >
                <MdInsertEmoticon className="h-[22px] text-[#1d9bf0]" />
              </div>
              <div className="icon">
                <MdDateRange className="h-[22px] text-[#1d9bf0]" />
              </div>

              {showEmojis && (
                  <Picker 
                    onSelect={addEmoji}
                    theme="dark"
                    style={{ 
                        position: 'absolute',
                        marginTop: "465px",
                        marginLeft: "-40",
                        maxWidth: "320px",
                        borderRadius: '20px',
                        borderColor: 'gray'
                     }}
                  />
              )}
            </div>
            <button 
                disabled={!input.trim() && !selectedFile ? true : false}
                className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-mold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={sendPost}
            >
                Tweet
            </button>
          </div>

        </div>
      </div>
    );
}

export default Input
