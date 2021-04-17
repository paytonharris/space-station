import './GlowBox.css';

interface GlowBoxPropsType {
  children: JSX.Element,
}

const GlowBox = ({ children }: GlowBoxPropsType) => {
  return (
    <div className='glowbox-main'>
      {children}
    </div>
  );
};

export default GlowBox;