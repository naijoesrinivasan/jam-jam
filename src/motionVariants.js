export const slideFromTop =  {
  hidden: { y: "-100vh" },
  show: { y: 0,
    transition: {
    duration: 2,
    type: "spring",
    damping: 15,
    delay: 1
  } },
}

export const slideFromBottom = {
  hidden: {y: "100vh" },
  visible: { 
    y: 0,
    transition: {
      duration: 2,
      type: "spring",
      delay: 1
    }
  }
}