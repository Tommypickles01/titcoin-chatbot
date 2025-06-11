import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import './App.css';
import ChatBot from './components/ChatBot';
import PriceFetcher from './components/PriceFetcher';
import Model from './components/Model';

function App() {
  return (
    <div className="app">
      <div className="model-viewer">
        <Canvas camera={{ position: [0, 1.5, 3] }}>
          <Stage environment="city" intensity={0.6}>
            <Model />
          </Stage>
          <OrbitControls enablePan={false} />
        </Canvas>
      </div>
      <div className="side-panel">
        <PriceFetcher />
        <ChatBot />
      </div>
    </div>
  );
}

export default App;
