import { Html, OrbitControls, Stars } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { geoEquirectangular, geoGraticule10, geoPath } from 'd3-geo'
import { useEffect, useMemo, useRef, useState, type ComponentRef } from 'react'
import {
  BackSide,
  CanvasTexture,
  Color,
  LinearFilter,
  Mesh,
  Quaternion,
  SRGBColorSpace,
  Vector3,
} from 'three'
import { feature } from 'topojson-client'
import countriesTopology from 'world-atlas/countries-110m.json'
import type { City } from '../data/cities'

const GLOBE_RADIUS = 2.15
const CAMERA_DISTANCE = 7

type GlobeSceneProps = {
  cities: City[]
  selectedCity: City | null
  focusVersion: number
  onSelectCity: (city: City) => void
}

type AnimationState = {
  startedAt: number
  startDirection: Vector3
  targetDirection: Vector3
}

function latLngToVector(latitude: number, longitude: number, radius = GLOBE_RADIUS) {
  const lat = (latitude * Math.PI) / 180
  const lng = (longitude * Math.PI) / 180

  return new Vector3(
    radius * Math.cos(lat) * Math.cos(lng),
    radius * Math.sin(lat),
    -radius * Math.cos(lat) * Math.sin(lng),
  )
}

function createEarthTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const context = canvas.getContext('2d')

  if (!context) return new CanvasTexture(canvas)

  const ocean = context.createLinearGradient(0, 0, canvas.width, canvas.height)
  ocean.addColorStop(0, '#071420')
  ocean.addColorStop(0.5, '#0a2230')
  ocean.addColorStop(1, '#07121d')
  context.fillStyle = ocean
  context.fillRect(0, 0, canvas.width, canvas.height)

  const projection = geoEquirectangular()
    .translate([canvas.width / 2, canvas.height / 2])
    .scale(canvas.width / (2 * Math.PI))
  const path = geoPath(projection, context)

  context.beginPath()
  path(geoGraticule10())
  context.strokeStyle = 'rgba(145, 205, 205, 0.10)'
  context.lineWidth = 1
  context.stroke()

  const topology = countriesTopology as {
    objects: { countries: unknown }
  }
  const land = feature(topology as never, topology.objects.countries as never)

  context.beginPath()
  path(land)
  context.fillStyle = '#21434a'
  context.fill()
  context.strokeStyle = 'rgba(129, 188, 175, 0.45)'
  context.lineWidth = 0.75
  context.stroke()

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  texture.needsUpdate = true
  return texture
}

function CameraRig({ selectedCity, focusVersion }: { selectedCity: City | null; focusVersion: number }) {
  const { camera } = useThree()
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null)
  const animationRef = useRef<AnimationState | null>(null)
  const scratch = useMemo(() => new Vector3(), [])

  useEffect(() => {
    if (!selectedCity) return
    animationRef.current = {
      startedAt: performance.now(),
      startDirection: camera.position.clone().normalize(),
      targetDirection: latLngToVector(selectedCity.latitude, selectedCity.longitude, 1),
    }
  }, [camera, focusVersion, selectedCity])

  useFrame(() => {
    const animation = animationRef.current
    if (!animation) return

    const progress = Math.min((performance.now() - animation.startedAt) / 1450, 1)
    const eased = progress * progress * (3 - 2 * progress)
    scratch
      .lerpVectors(animation.startDirection, animation.targetDirection, eased)
      .normalize()
      .multiplyScalar(CAMERA_DISTANCE)

    camera.position.copy(scratch)
    camera.lookAt(0, 0, 0)
    controlsRef.current?.update()

    if (progress === 1) animationRef.current = null
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableDamping
      dampingFactor={0.055}
      minDistance={5.2}
      maxDistance={9}
      rotateSpeed={0.45}
      zoomSpeed={0.6}
      autoRotate={!selectedCity}
      autoRotateSpeed={0.34}
    />
  )
}

function CityMarker({ city, selected, onSelect }: { city: City; selected: boolean; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false)
  const pulseRef = useRef<Mesh>(null)
  const position = useMemo(
    () => latLngToVector(city.latitude, city.longitude, GLOBE_RADIUS + 0.055),
    [city.latitude, city.longitude],
  )
  const orientation = useMemo(
    () => new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), position.clone().normalize()),
    [position],
  )

  useFrame(({ clock }) => {
    if (!pulseRef.current) return
    const pulse = 1 + Math.sin(clock.elapsedTime * 2.3 + city.longitude) * 0.14
    pulseRef.current.scale.setScalar(selected ? pulse * 1.45 : pulse)
  })

  const setCursor = (value: string) => {
    document.body.style.cursor = value
  }

  return (
    <group position={position.toArray()} quaternion={orientation}>
      <mesh
        onClick={(event) => {
          event.stopPropagation()
          onSelect()
        }}
        onPointerEnter={(event) => {
          event.stopPropagation()
          setHovered(true)
          setCursor('pointer')
        }}
        onPointerLeave={() => {
          setHovered(false)
          setCursor('default')
        }}
      >
        <sphereGeometry args={[0.13, 14, 14]} />
        <meshBasicMaterial transparent opacity={0.001} depthWrite={false} />
      </mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[selected ? 0.062 : 0.048, 18, 18]} />
        <meshStandardMaterial
          color={selected ? '#fff4c7' : '#ffd789'}
          emissive={selected ? '#fff0aa' : '#ffad43'}
          emissiveIntensity={selected ? 4.5 : 3.2}
          toneMapped={false}
        />
      </mesh>
      <mesh scale={selected ? 1.4 : 1}>
        <ringGeometry args={[0.075, 0.09, 28]} />
        <meshBasicMaterial color="#ffd98f" transparent opacity={0.7} depthWrite={false} />
      </mesh>
      {(hovered || selected) && (
        <Html center distanceFactor={7.5} position={[0, 0.23, 0]} style={{ pointerEvents: 'none' }}>
          <span className="globe-label">{city.name}</span>
        </Html>
      )}
    </group>
  )
}

function Globe({ cities, selectedCity, onSelectCity }: Omit<GlobeSceneProps, 'focusVersion'>) {
  const earthTexture = useMemo(createEarthTexture, [])

  useEffect(() => () => earthTexture.dispose(), [earthTexture])

  return (
    <>
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 3, 5]} intensity={2.4} color="#dbefff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.55} color="#4b86a8" />

      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 96, 96]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.82}
          metalness={0.08}
          color="#b7d7d4"
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.12, 64, 64]} />
        <meshBasicMaterial
          color="#5cb7cf"
          transparent
          opacity={0.08}
          side={BackSide}
          depthWrite={false}
        />
      </mesh>

      {cities.map((city) => (
        <CityMarker
          city={city}
          selected={selectedCity?.id === city.id}
          onSelect={() => onSelectCity(city)}
          key={city.id}
        />
      ))}
    </>
  )
}

export function GlobeScene({ cities, selectedCity, focusVersion, onSelectCity }: GlobeSceneProps) {
  return (
    <div className="globe-canvas" aria-label="Interactive globe with selectable city markers">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.35, CAMERA_DISTANCE], fov: 42, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor(new Color('#050a12'), 0)}
      >
        <fog attach="fog" args={['#050a12', 10, 25]} />
        <Stars radius={45} depth={28} count={1800} factor={2.5} saturation={0.2} fade speed={0.25} />
        <Globe cities={cities} selectedCity={selectedCity} onSelectCity={onSelectCity} />
        <CameraRig selectedCity={selectedCity} focusVersion={focusVersion} />
      </Canvas>
    </div>
  )
}
