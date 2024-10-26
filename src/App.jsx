import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import "./style.css";

function LogoPlane() {
  // Initialize the ref without TypeScript type annotations
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const texture = useLoader(TextureLoader, 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_icon-qMnR7HH2vtBef5irVvKgnSJ9fY1AC0.png')

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.5
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <mesh
      ref={mesh} // Use ref without TypeScript
      scale={active ? 1.2 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial 
        map={texture} 
        transparent={true} 
        side={THREE.DoubleSide}
        emissive="#2dd4bf"
        emissiveIntensity={hovered ? 0.5 : 0.3}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <Canvas camera={{fov: 90 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <LogoPlane />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div style={{width : "100%" , height : "100%"}}>
      <Scene />
    </div>
  )
} 