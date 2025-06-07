// app/(tabs)/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login'); // Redireciona para a tela de login
  }, []);

  return null; // Você pode colocar um <Loading /> se quiser
}
