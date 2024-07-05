import Container from './component/Container';
import ItemGallery2 from './component/ItemGallery2';
import logo from './logo.svg';

function App() {
  return (
    <div className='w-full h-full flex flex-col items-center mt-8'>
      <Container/>
      <ItemGallery2/>
    </div>
  );
}

export default App;
