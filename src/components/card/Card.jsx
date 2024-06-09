const Card = ({ children }) => {
  return (
    <div class="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border">
      {children}
    </div>
  );
};

export default Card;