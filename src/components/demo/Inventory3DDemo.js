'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box as ThreeBox, Sphere, Cylinder } from '@react-three/drei';
import { Box as BoxIcon, RotateCcw, ZoomIn, Eye, Home, Check } from 'lucide-react';
import { demo3DItems, demoRooms } from '@/data/demoData';

// 3D Item Component
function Item3D({ item, isSelected, onClick }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      if (isSelected) {
        meshRef.current.scale.setScalar(1.1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
      }
    }
  });

  const getGeometry = () => {
    switch (item.name) {
      case 'iPhone 15 Pro':
        return <ThreeBox args={[0.3, 0.6, 0.05]} />;
      case 'Samsung Refrigerator':
        return <ThreeBox args={[1, 2, 0.8]} />;
      case 'MacBook Pro':
        return <ThreeBox args={[1.2, 0.8, 0.1]} />;
      case 'Dyson V15':
        return <Cylinder args={[0.1, 0.1, 1.2]} />;
      default:
        return <ThreeBox args={[0.5, 0.5, 0.5]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={[item.position.x, item.position.y, item.position.z]}
      rotation={[item.rotation.x, item.rotation.y, item.rotation.z]}
      onClick={onClick}
      scale={isSelected ? 1.2 : 1}
    >
      {getGeometry()}
      <meshStandardMaterial 
        color={isSelected ? '#00D4FF' : item.color} 
        transparent 
        opacity={0.8}
        emissive={isSelected ? '#00D4FF' : '#000000'}
        emissiveIntensity={isSelected ? 0.2 : 0}
      />
    </mesh>
  );
}

// Room Environment
function RoomEnvironment() {
  return (
    <>
      {/* Floor */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.3} />
      </mesh>
      
      {/* Walls */}
      <mesh position={[0, 2, -5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#0a0a0f" transparent opacity={0.2} />
      </mesh>
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00D4FF" />
      <pointLight position={[-5, 5, -5]} intensity={0.6} color="#8B5CF6" />
    </>
  );
}

const Inventory3DDemo = ({ onComplete, isActive }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('office');
  const [viewMode, setViewMode] = useState('3d'); // 3d, ar, list

  useEffect(() => {
    if (isActive) {
      // Auto-complete after user interaction
      const timer = setTimeout(() => {
        onComplete && onComplete();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  const filteredItems = demo3DItems.filter(item => 
    selectedRoom === 'all' || item.room === selectedRoom
  );

  return (
    <div className="space-y-6">
      <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
        <h3 className="font-semibold text-secondary mb-2">🏠 3D Inventory Demo</h3>
        <p className="text-white/80 text-sm">
          Visualize your items in 3D space. Click on items to see details, switch between rooms, 
          and experience the future of inventory management.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        
        {/* Controls Sidebar */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-3">Room Selection</h4>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedRoom('all')}
                className={`w-full text-left px-3 py-2 rounded-lg border transition-all duration-300 ${
                  selectedRoom === 'all' 
                    ? 'border-primary bg-primary/20 text-primary' 
                    : 'border-white/20 text-white/70 hover:border-white/40'
                }`}
              >
                All Rooms ({demo3DItems.length})
              </button>
              {demoRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg border transition-all duration-300 ${
                    selectedRoom === room.id 
                      ? 'border-primary bg-primary/20 text-primary' 
                      : 'border-white/20 text-white/70 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{room.name}</span>
                    <span className="text-xs">({room.items})</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">View Mode</h4>
            <div className="space-y-2">
              <button
                onClick={() => setViewMode('3d')}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-300 ${
                  viewMode === '3d' 
                    ? 'border-secondary bg-secondary/20 text-secondary' 
                    : 'border-white/20 text-white/70 hover:border-white/40'
                }`}
              >
                <BoxIcon className="w-4 h-4" />
                <span>3D View</span>
              </button>
              <button
                onClick={() => setViewMode('ar')}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-300 ${
                  viewMode === 'ar' 
                    ? 'border-accent bg-accent/20 text-accent' 
                    : 'border-white/20 text-white/70 hover:border-white/40'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>AR Preview</span>
              </button>
            </div>
          </div>

          {selectedItem && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Selected Item</h4>
              <div className="space-y-2 text-sm">
                <div className="text-white">{selectedItem.name}</div>
                <div className="text-white/70">Room: {selectedItem.room}</div>
                <div className="text-white/70">
                  Position: ({selectedItem.position.x}, {selectedItem.position.y}, {selectedItem.position.z})
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3D Viewport */}
        <div className="lg:col-span-3">
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h4 className="font-semibold text-white">
                {viewMode === '3d' ? '3D Inventory View' : 'AR Preview Mode'}
              </h4>
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300">
                  <RotateCcw className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300">
                  <ZoomIn className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300">
                  <Home className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="h-96 relative">
              {viewMode === '3d' ? (
                <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
                  <RoomEnvironment />
                  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                  
                  {filteredItems.map((item) => (
                    <Item3D
                      key={item.id}
                      item={item}
                      isSelected={selectedItem?.id === item.id}
                      onClick={() => setSelectedItem(item)}
                    />
                  ))}
                </Canvas>
              ) : (
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-primary/20">
                  <div className="text-center">
                    <Eye className="w-16 h-16 text-accent mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">AR Preview Mode</h3>
                    <p className="text-white/70 mb-4">Point your camera to see items in real space</p>
                    <button className="px-6 py-2 bg-accent/20 border border-accent/30 rounded-lg text-accent hover:bg-accent/30 transition-all duration-300">
                      Enable Camera
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Item List */}
            <div className="p-4 border-t border-white/10">
              <h5 className="font-semibold text-white mb-3">Items in View</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-2 rounded-lg border text-xs transition-all duration-300 ${
                      selectedItem?.id === item.id
                        ? 'border-primary bg-primary/20 text-primary'
                        : 'border-white/20 text-white/70 hover:border-white/40'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          onClick={() => {
            setSelectedItem(null);
            setSelectedRoom('office');
            setViewMode('3d');
          }}
          className="px-4 py-2 border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
        >
          Reset View
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-secondary">
            <Check className="w-4 h-4" />
            <span className="text-sm">3D Experience Complete!</span>
          </div>
          
          <button
            onClick={() => onComplete && onComplete()}
            className="px-6 py-2 bg-gradient-to-r from-secondary to-accent rounded-lg text-white hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300"
          >
            Continue to Claims
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inventory3DDemo;
