import React, {Fragment, useEffect, useState, useRef} from 'react'
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { Dialog, Transition } from '@headlessui/react'
import { MdBarChart, MdClose, MdDateRange, MdImage, MdInsertEmoticon } from "react-icons/md";
import { db } from "../firbase";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import { Picker } from 'emoji-mart';
import { useRouter } from "next/router";

const Modal = () => {

    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);
    const [post, setPost] = useState()
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([]);
    const [showEmojis, setShowEmojis] = useState(false);
    const router = useRouter();

    const filePickerRef = useRef();

    useEffect(
      () =>
        onSnapshot(doc(db, "posts", postId), (snapshot) => {
            setPost(snapshot.data());
        }),
      [db, postId]
    );

    useEffect(
      () =>
        onSnapshot(
          query(
            collection(db, "posts", postId, "comments"),
            orderBy("timestamp", "desc")
          ),
          (snapshot) => setComments(snapshot.docs)
        ),
      [db, postId]
    );

    const addEmoji = (e) => {
      let sym = e.unified.split("-");
      let codesArray = [];
      sym.forEach((el) => codesArray.push("0x" + el));
      let emoji = String.fromCodePoint(...codesArray);
      setInput(comment + emoji);
    };

    const sendComment = async (e) => {
      e.preventDefault();
      await addDoc(collection(db, 'posts', postId, "comments"), {
        comment: comment,
        username: session.user.name,
        tag: session.user.tag,
        userimage: session.user.image,
        timestamp: serverTimestamp()
      })

      setIsOpen(false)
      setComment("")

      router.push(`post/${postId}`)
    }

    console.log(postId);

    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-800 opacity-80" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-black shadow-xl rounded-2xl">
                <div className="flex items-center px-1.5 py-2 border-b border-gray-400">
                  <div
                    className="absolute top-1 right-1 hoverAnimation w-9 h-9 flex items-center justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <MdClose className="h-[22px] text-white" />
                  </div>
                </div>

                <div className="flex px-4 pt-5 pb-3 sm:px-6">
                  <div className="w-full">
                    <div className="text-[#6e767d] flex gap-x-3 relative">
                      <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />
                      <img
                        src={post?.userImg}
                        alt=""
                        className="h-11 w-11 rounded-full"
                      />
                      <div>
                        <div className="inline-block group">
                          <h4 className="font-bold text-[15px] sm:text-base text-[#d9d9d9] inline-block">
                            {post?.username}
                          </h4>
                          <span className="ml-2 text-sm sm:text-[15px]">
                            @{post?.tag}
                          </span>
                        </div>{" "}
                        .{" "}
                        <span className="hover:underline text-sm sm:text-[15px]">
                          {" "}
                          <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                        </span>
                        <p className="text-[#d9d9d9] text-[15px] sm:text-base">
                          {post?.text}
                        </p>
                      </div>
                    </div>

                    {/* {comments.length > 0 &&
                      comments.map((c) => (
                        <div
                          key={c.id}
                          className="text-[#6e767d] flex gap-x-3 relative mt-3"
                        >
                          <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />
                          <img
                            src={c.data().userimage}
                            alt=""
                            className="h-11 w-11 rounded-full"
                          />
                          <div>
                            <div className="inline-block group">
                              <h4 className="font-bold text-[15px] sm:text-base text-[#d9d9d9] inline-block">
                                {c.data().username}
                              </h4>
                              <span className="ml-2 text-sm sm:text-[15px]">
                                @{c.data().tag}
                              </span>
                            </div>{" "}
                            .{" "}
                            <span className="hover:underline text-sm sm:text-[15px]">
                              {" "}
                              <Moment fromNow>
                                {c.data().timestamp?.toDate()}
                              </Moment>
                            </span>
                            <p className="text-[#d9d9d9] text-[15px] sm:text-base">
                              {c.data().comment}
                            </p>
                          </div>
                        </div>
                      ))} */}

                    <div className="mt-5 flex space-x-3 w-full">
                      <img
                        src={session?.user?.image}
                        alt=""
                        className="h-11 w-11 rounded-full"
                      />
                      <div className="flex-grow mt-2">
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Tweet your reply"
                          rows="2"
                          className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]"
                        />
                        <div className="flex items-center justify-between pt-2.5">
                          <div className="flex items-center">
                            <div
                              className="icon"
                              // onClick={() => filePickerRef.current.click()}
                            >
                              <MdImage className="h-[22px] text-[#1d9bf0]" />
                              <input
                                type="file"
                                className="hidden"
                                // ref={filePickerRef}
                                // onChange={addImageToPost}
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
                                  position: "absolute",
                                  marginTop: "465px",
                                  marginLeft: "-40",
                                  maxWidth: "320px",
                                  borderRadius: "20px",
                                  borderColor: "gray",
                                  zIndex: "1000",
                                }}
                              />
                            )}
                          </div>
                          <button
                            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                            type="submit"
                            onClick={sendComment}
                            disabled={!comment.trim()}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
}

export default Modal
