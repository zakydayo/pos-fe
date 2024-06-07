const Container = (props) => {
  const { children } = props;

  return (
    <div {...props} className="p-3">
      {children}
    </div>
  );
};

export default Container;