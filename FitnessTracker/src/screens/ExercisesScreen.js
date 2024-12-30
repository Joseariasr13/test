import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Modal,
  TextInput,
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';


const exercisesData = {
  
    "pecho": [
      {
        id: 'p1',
        name: 'Press de Banca',
        difficulty: 5,
        description: 'El ejercicio rey para el desarrollo del pecho. Trabaja todo el pectoral mayor.',
        muscles: ['Pecho', 'Tríceps', 'Deltoides anterior'],
        tips: ['Mantén los codos a 45°', 'Respira controladamente', 'Pies firmes en el suelo']
      },
      {
        id: 'p2',
        name: 'Press Inclinado con Mancuernas',
        difficulty: 4,
        description: 'Excelente para desarrollar la parte superior del pecho.',
        muscles: ['Pecho superior', 'Deltoides anterior'],
        tips: ['Mantén el banco a 30-45°', 'No choques las mancuernas arriba']
      },
      {
        id: 'p3',
        name: 'Aperturas con Mancuernas',
        difficulty: 3,
        description: 'Ejercicio de aislamiento que estira y contrae el pecho efectivamente.',
        muscles: ['Pecho', 'Deltoides anterior'],
        tips: ['Mantén los codos ligeramente flexionados', 'Movimiento controlado']
      },
      {
        id: 'p4',
        name: 'Press Declinado',
        difficulty: 4,
        description: 'Enfoca el trabajo en la parte inferior del pecho.',
        muscles: ['Pecho inferior', 'Tríceps'],
        tips: ['Asegúrate bien en el banco', 'Mantén el control en la bajada']
      },
      {
        id: 'p5',
        name: 'Fondos en Paralelas',
        difficulty: 5,
        description: 'Excelente ejercicio compuesto para pecho y tríceps.',
        muscles: ['Pecho inferior', 'Tríceps'],
        tips: ['Inclina el torso hacia adelante', 'Baja hasta sentir el estiramiento']
      },
      {
        id: 'p6',
        name: 'Crossover en Polea Alta',
        difficulty: 3,
        description: 'Gran ejercicio de definición y acabado.',
        muscles: ['Pecho', 'Deltoides anterior'],
        tips: ['Mantén una ligera flexión en los codos', 'Siente el apretón en el centro']
      },
      {
        id: 'p7',
        name: 'Press con Banda Elástica',
        difficulty: 2,
        description: 'Excelente para principiantes o trabajo de recuperación.',
        muscles: ['Pecho', 'Tríceps'],
        tips: ['Mantén la tensión constante', 'Controla el movimiento de retorno']
      },
      {
        id: 'p8',
        name: 'Push-Ups (Flexiones)',
        difficulty: 3,
        description: 'Ejercicio básico pero efectivo que puedes hacer en cualquier lugar.',
        muscles: ['Pecho', 'Tríceps', 'Core'],
        tips: ['Mantén el core apretado', 'Codos cerca del cuerpo']
      },
      {
        id: 'p9',
        name: 'Press de Banca con Agarre Cerrado',
        difficulty: 4,
        description: 'Variación que enfatiza más el trabajo de tríceps.',
        muscles: ['Pecho interno', 'Tríceps'],
        tips: ['Agarre a la anchura de los hombros', 'Codos pegados al cuerpo']
      },
      {
        id: 'p10',
        name: 'Aperturas en Máquina Pec-Deck',
        difficulty: 2,
        description: 'Ejercicio de aislamiento con movimiento guiado.',
        muscles: ['Pecho'],
        tips: ['Ajusta bien el asiento', 'No uses demasiado peso al inicio']
      },
      {
        id: 'p11',
        name: 'Press de Banca con Smith',
        difficulty: 3,
        description: 'Variación más controlada del press de banca.',
        muscles: ['Pecho', 'Tríceps'],
        tips: ['Ajusta bien los seguros', 'Mantén la espalda plana']
      },
      {
        id: 'p12',
        name: 'Flexiones Diamante',
        difficulty: 4,
        description: 'Variación desafiante de las flexiones tradicionales.',
        muscles: ['Pecho interno', 'Tríceps'],
        tips: ['Forma un diamante con las manos', 'Mantén los codos cerca']
      },
      {
        id: 'p13',
        name: 'Press con Mancuernas en Suelo',
        difficulty: 3,
        description: 'Alternativa segura cuando no hay banco disponible.',
        muscles: ['Pecho', 'Tríceps'],
        tips: ['Mantén la espalda en el suelo', 'No bajes demasiado los codos']
      },
      {
        id: 'p14',
        name: 'Pullover con Mancuerna',
        difficulty: 3,
        description: 'Ejercicio que trabaja la conexión pecho-espalda.',
        muscles: ['Pecho', 'Dorsal', 'Serrato'],
        tips: ['Mantén los brazos ligeramente flexionados', 'Respira con el movimiento']
      },
      {
        id: 'p15',
        name: 'Flexiones con Palmada',
        difficulty: 5,
        description: 'Ejercicio avanzado para potencia y explosividad.',
        muscles: ['Pecho', 'Tríceps'],
        tips: ['Empieza con pocas repeticiones', 'Asegura una buena forma básica']
      }
    ],
    
    "espalda": [
      {
        id: 'e1',
        name: 'Dominadas',
        difficulty: 5,
        description: 'El mejor ejercicio para espalda con peso corporal.',
        muscles: ['Dorsal', 'Bíceps', 'Antebrazos'],
        tips: ['Retrae los omóplatos', 'No balancees el cuerpo']
      },
      {
        id: 'e2',
        name: 'Remo con Barra',
        difficulty: 4,
        description: 'Ejercicio compuesto para espalda media y superior.',
        muscles: ['Dorsal', 'Trapecios', 'Romboides'],
        tips: ['Mantén la espalda recta', 'Lleva la barra al abdomen']
      },
      {
        id: 'e3',
        name: 'Jalón al Pecho',
        difficulty: 3,
        description: 'Excelente para principiantes y avanzados.',
        muscles: ['Dorsal', 'Bíceps'],
        tips: ['Agarre más ancho que hombros', 'Lleva la barra al pecho']
      },
      {
        id: 'e4',
        name: 'Remo con Mancuerna',
        difficulty: 3,
        description: 'Trabajo unilateral para balance muscular.',
        muscles: ['Dorsal', 'Trapecios'],
        tips: ['Mantén la espalda paralela al suelo', 'No rotes el torso']
      },
      {
        id: 'e5',
        name: 'Peso Muerto',
        difficulty: 5,
        description: 'Rey de los ejercicios para espalda baja.',
        muscles: ['Espalda baja', 'Glúteos', 'Isquios'],
        tips: ['Mantén la espalda recta', 'Empuja con las piernas']
      },
      {
        id: 'e6',
        name: 'Remo en Máquina',
        difficulty: 2,
        description: 'Ideal para principiantes y trabajo de forma.',
        muscles: ['Dorsal', 'Romboides'],
        tips: ['Ajusta bien el asiento', 'Mantén el pecho pegado al soporte']
      },
      {
        id: 'e7',
        name: 'Pull-Over con Polea Alta',
        difficulty: 3,
        description: 'Aislamiento para la parte superior del dorsal.',
        muscles: ['Dorsal superior', 'Pecho'],
        tips: ['Mantén los brazos ligeramente flexionados', 'No uses momentum']
      },
      {
        id: 'e8',
        name: 'Remo Meadows',
        difficulty: 4,
        description: 'Variación del remo que enfatiza el dorsal inferior.',
        muscles: ['Dorsal inferior', 'Romboides'],
        tips: ['Codos pegados al cuerpo', 'Tira hacia las caderas']
      },
      {
        id: 'e9',
        name: 'Hiperextensiones',
        difficulty: 2,
        description: 'Fortalece la espalda baja y previene lesiones.',
        muscles: ['Espalda baja', 'Glúteos'],
        tips: ['No hiperextiendas el cuello', 'Movimiento controlado']
      },
      {
        id: 'e10',
        name: 'Face Pull',
        difficulty: 3,
        description: 'Excelente para postura y salud del hombro.',
        muscles: ['Trapecios medios', 'Romboides', 'Rotadores'],
        tips: ['Tira hacia la cara', 'Rota externamente los hombros']
      },
      {
        id: 'e11',
        name: 'Remo Pendlay',
        difficulty: 4,
        description: 'Variación explosiva del remo con barra.',
        muscles: ['Dorsal', 'Trapecios'],
        tips: ['Mantén la espalda paralela al suelo', 'Movimiento explosivo']
      },
      {
        id: 'e12',
        name: 'Good Morning',
        difficulty: 4,
        description: 'Fortalece la cadena posterior.',
        muscles: ['Espalda baja', 'Isquios'],
        tips: ['Mantén las rodillas ligeramente flexionadas', 'Bisagra en la cadera']
      },
      {
        id: 'e13',
        name: 'Remo en T',
        difficulty: 3,
        description: 'Excelente para el desarrollo de la espalda media.',
        muscles: ['Trapecios', 'Romboides'],
        tips: ['Mantén los codos altos', 'Aprieta los omóplatos']
      },
      {
        id: 'e14',
        name: 'Dominadas con Agarre Neutro',
        difficulty: 4,
        description: 'Variación más cómoda para los hombros.',
        muscles: ['Dorsal', 'Bíceps'],
        tips: ['Agarre a la anchura de hombros', 'Mantén el core apretado']
      },
      {
        id: 'e15',
        name: 'Remo Unilateral con Polea',
        difficulty: 3,
        description: 'Excelente para corregir desequilibrios.',
        muscles: ['Dorsal', 'Romboides'],
        tips: ['No rotes el torso', 'Mantén el codo cerca del cuerpo']
      }
    ],

"hombros": [
  {
    id: 'h1',
    name: 'Press Militar con Barra',
    difficulty: 5,
    description: 'El ejercicio fundamental para desarrollo de hombros.',
    muscles: ['Deltoides', 'Trapecio', 'Tríceps'],
    tips: ['Mantén el core apretado', 'No arquees la espalda', 'Agarre a la altura de los hombros']
  },
  {
    id: 'h2',
    name: 'Elevaciones Laterales',
    difficulty: 2,
    description: 'Ejercicio de aislamiento para deltoides lateral.',
    muscles: ['Deltoides lateral'],
    tips: ['Codos ligeramente flexionados', 'No uses impulso', 'Eleva hasta la altura del hombro']
  },
  {
    id: 'h3',
    name: 'Press Arnold',
    difficulty: 4,
    description: 'Variación del press que trabaja todos los deltoides.',
    muscles: ['Deltoides anterior', 'Deltoides lateral', 'Deltoides posterior'],
    tips: ['Gira las palmas durante el movimiento', 'Mantén la espalda recta']
  },
  {
    id: 'h4',
    name: 'Pájaros con Mancuernas',
    difficulty: 3,
    description: 'Ejercicio para deltoides posterior.',
    muscles: ['Deltoides posterior', 'Trapecio'],
    tips: ['Inclínate hacia adelante', 'Mantén los codos altos']
  },
  {
    id: 'h5',
    name: 'Press con Mancuernas',
    difficulty: 4,
    description: 'Versión con mancuernas del press militar.',
    muscles: ['Deltoides', 'Tríceps'],
    tips: ['Mantén las muñecas rectas', 'Movimiento controlado']
  },
  {
    id: 'h6',
    name: 'Face Pull',
    difficulty: 3,
    description: 'Excelente para postura y deltoides posterior.',
    muscles: ['Deltoides posterior', 'Trapecio', 'Rotadores'],
    tips: ['Tira hacia la cara', 'Rota externamente los hombros']
  },
  {
    id: 'h7',
    name: 'Press tras Nuca',
    difficulty: 4,
    description: 'Variación que enfatiza la parte posterior.',
    muscles: ['Deltoides', 'Trapecio'],
    tips: ['Precaución con la movilidad', 'No fuerces el rango']
  },
  {
    id: 'h8',
    name: 'Elevaciones Frontales',
    difficulty: 2,
    description: 'Aislamiento para deltoides anterior.',
    muscles: ['Deltoides anterior'],
    tips: ['No balancees el cuerpo', 'Mantén los codos ligeramente flexionados']
  },
  {
    id: 'h9',
    name: 'Remo al Mentón',
    difficulty: 3,
    description: 'Trabaja deltoides y trapecios.',
    muscles: ['Deltoides', 'Trapecio'],
    tips: ['Codos por encima de los hombros', 'Mantén la barra cerca del cuerpo']
  },
  {
    id: 'h10',
    name: 'Press en Máquina Smith',
    difficulty: 3,
    description: 'Versión guiada del press militar.',
    muscles: ['Deltoides', 'Tríceps'],
    tips: ['Ajusta bien la altura', 'Mantén la trayectoria recta']
  },
  {
    id: 'h11',
    name: 'Elevaciones 180°',
    difficulty: 3,
    description: 'Movimiento completo para deltoides.',
    muscles: ['Deltoides anterior', 'Deltoides lateral'],
    tips: ['Movimiento en arco', 'Peso moderado']
  },
  {
    id: 'h12',
    name: 'Press Cuban',
    difficulty: 4,
    description: 'Ejercicio compuesto para hombros.',
    muscles: ['Deltoides', 'Rotadores', 'Trapecios'],
    tips: ['Mantén los codos altos', 'Rotación externa controlada']
  },
  {
    id: 'h13',
    name: 'Elevaciones en Cable',
    difficulty: 3,
    description: 'Variación con tensión constante.',
    muscles: ['Deltoides lateral'],
    tips: ['Mantén el codo fijo', 'Control en la bajada']
  },
  {
    id: 'h14',
    name: 'Press Bradford',
    difficulty: 4,
    description: 'Variación intensa del press militar.',
    muscles: ['Deltoides', 'Trapecio'],
    tips: ['Pasa la barra por encima', 'Mantén la tensión']
  },
  {
    id: 'h15',
    name: 'Encogimientos de Hombros',
    difficulty: 2,
    description: 'Ejercicio básico para trapecios.',
    muscles: ['Trapecio'],
    tips: ['No ruedes los hombros', 'Mantén los brazos rectos']
  }
],
"bíceps": [
  {
    id: 'b1',
    name: 'Curl con Barra',
    difficulty: 3,
    description: 'El ejercicio clásico para bíceps.',
    muscles: ['Bíceps', 'Braquial'],
    tips: ['Mantén los codos fijos', 'No balancees el cuerpo']
  },
  // ... continuación de bíceps
  {
    id: 'b2',
    name: 'Curl Martillo',
    difficulty: 3,
    description: 'Excelente para trabajar braquial y bíceps.',
    muscles: ['Bíceps', 'Braquial', 'Antebrazo'],
    tips: ['Mantén las muñecas firmes', 'Alterna los brazos']
  },
  {
    id: 'b3',
    name: 'Curl Concentrado',
    difficulty: 2,
    description: 'Ejercicio de aislamiento con máxima concentración.',
    muscles: ['Bíceps'],
    tips: ['Codo apoyado en rodilla', 'Gira la muñeca al subir']
  },
  {
    id: 'b4',
    name: 'Curl con Polea',
    difficulty: 2,
    description: 'Mantiene tensión constante en el bíceps.',
    muscles: ['Bíceps', 'Braquial'],
    tips: ['Mantén los codos pegados', 'No uses impulso']
  },
  {
    id: 'b5',
    name: 'Curl Scott',
    difficulty: 4,
    description: 'Aislamiento perfecto en banco predicador.',
    muscles: ['Bíceps'],
    tips: ['Axilas apoyadas en banco', 'Extensión completa']
  },
  {
    id: 'b6',
    name: 'Curl 21s',
    difficulty: 4,
    description: 'Serie intensiva de 21 repeticiones divididas.',
    muscles: ['Bíceps', 'Resistencia'],
    tips: ['7 reps mitad inferior', '7 reps mitad superior', '7 reps completas']
  },
  {
    id: 'b7',
    name: 'Curl Araña',
    difficulty: 3,
    description: 'Variación inclinada del curl con mancuernas.',
    muscles: ['Bíceps', 'Braquial'],
    tips: ['Pecho contra banco inclinado', 'Brazos cuelgan naturalmente']
  },
  {
    id: 'b8',
    name: 'Curl Inverso',
    difficulty: 3,
    description: 'Trabaja el braquiorradial y bíceps.',
    muscles: ['Braquiorradial', 'Bíceps'],
    tips: ['Agarre en pronación', 'Movimiento controlado']
  },
  {
    id: 'b9',
    name: 'Curl con Cable de Pie',
    difficulty: 3,
    description: 'Ejercicio con tensión constante.',
    muscles: ['Bíceps'],
    tips: ['Codos pegados al cuerpo', 'No balancees']
  },
  {
    id: 'b10',
    name: 'Curl Zottman',
    difficulty: 4,
    description: 'Combinación de curl regular e inverso.',
    muscles: ['Bíceps', 'Antebrazos'],
    tips: ['Gira en la parte superior', 'Baja en pronación']
  },
  {
    id: 'b11',
    name: 'Curl en Banco Inclinado',
    difficulty: 3,
    description: 'Mayor estiramiento del bíceps.',
    muscles: ['Bíceps'],
    tips: ['Banco a 45 grados', 'Brazos extendidos']
  },
  {
    id: 'b12',
    name: 'Curl Alternado',
    difficulty: 2,
    description: 'Trabajo independiente de cada brazo.',
    muscles: ['Bíceps', 'Braquial'],
    tips: ['Alterna los brazos', 'Mantén un brazo contraído']
  },
  {
    id: 'b13',
    name: 'Curl con Barra Z',
    difficulty: 3,
    description: 'Variación ergonómica del curl con barra.',
    muscles: ['Bíceps'],
    tips: ['Agarre cómodo', 'Mantén los codos estables']
  },
  {
    id: 'b14',
    name: 'Curl de Pie con Cable',
    difficulty: 3,
    description: 'Ejercicio con resistencia constante.',
    muscles: ['Bíceps'],
    tips: ['Mantén la postura erguida', 'No uses impulso']
  },
  {
    id: 'b15',
    name: 'Curl en Polea Alta',
    difficulty: 3,
    description: 'Variación que maximiza la tensión.',
    muscles: ['Bíceps', 'Braquial'],
    tips: ['Mantén los codos altos', 'Contrae en la parte inferior']
  }
],
"tríceps": [
  {
    id: 't1',
    name: 'Press Francés',
    difficulty: 4,
    description: 'Ejercicio fundamental para tríceps.',
    muscles: ['Tríceps'],
    tips: ['Mantén los codos fijos', 'No separes los brazos']
  },
  {
    id: 't2',
    name: 'Extensiones con Polea',
    difficulty: 3,
    description: 'Excelente ejercicio para aislamiento.',
    muscles: ['Tríceps'],
    tips: ['Codos pegados al cuerpo', 'Extensión completa']
  },
  {
    id: 't3',
    name: 'Fondos en Paralelas',
    difficulty: 4,
    description: 'Ejercicio compuesto para tríceps y pecho.',
    muscles: ['Tríceps', 'Pecho', 'Hombros'],
    tips: ['Codos cerca del cuerpo', 'Control en bajada']
  },
  {
    id: 't4',
    name: 'Extensiones sobre la Cabeza',
    difficulty: 3,
    description: 'Trabaja el tríceps en elongación.',
    muscles: ['Tríceps largo'],
    tips: ['Mantén los brazos junto a las orejas', 'No muevas los hombros']
  },
  {
    id: 't5',
    name: 'Press Cerrado',
    difficulty: 4,
    description: 'Variación del press de banca para tríceps.',
    muscles: ['Tríceps', 'Pecho'],
    tips: ['Agarre estrecho', 'Codos pegados']
  },
  {
    id: 't6',
    name: 'Patada de Tríceps',
    difficulty: 2,
    description: 'Aislamiento efectivo para la cabeza lateral.',
    muscles: ['Tríceps lateral'],
    tips: ['Mantén el brazo paralelo al suelo', 'No muevas el hombro']
  },
  {
    id: 't7',
    name: 'Extensiones en Polea Alta',
    difficulty: 3,
    description: 'Trabajo con tensión constante.',
    muscles: ['Tríceps'],
    tips: ['Mantén los codos altos', 'No dejes que los codos se muevan']
  },
  {
    id: 't8',
    name: 'Extensiones en Banco',
    difficulty: 3,
    description: 'Ejercicio estable para principiantes.',
    muscles: ['Tríceps'],
    tips: ['Mantén la espalda recta', 'Codos apuntando al techo']
  },
  {
    id: 't9',
    name: 'Press con Mancuerna a Una Mano',
    difficulty: 3,
    description: 'Trabajo unilateral para equilibrio.',
    muscles: ['Tríceps'],
    tips: ['Mantén el codo fijo', 'Extensión completa']
  },
  {
    id: 't10',
    name: 'Extensiones en V-Bar',
    difficulty: 3,
    description: 'Variación cómoda con agarre neutro.',
    muscles: ['Tríceps'],
    tips: ['Mantén los codos pegados', 'Extiende completamente']
  },
  {
    id: 't11',
    name: 'Fondos en Banco',
    difficulty: 2,
    description: 'Ejercicio básico con peso corporal.',
    muscles: ['Tríceps', 'Pecho'],
    tips: ['Mantén el cuerpo cerca del banco', 'No bloquees los codos']
  },
  {
    id: 't12',
    name: 'Extensiones con Cuerda',
    difficulty: 3,
    description: 'Permite mayor rango de movimiento.',
    muscles: ['Tríceps'],
    tips: ['Separa las cuerdas al final', 'Mantén tensión constante']
  },
  {
    id: 't13',
    name: 'Press JM',
    difficulty: 4,
    description: 'Variación avanzada del press cerrado.',
    muscles: ['Tríceps', 'Pecho'],
    tips: ['Baja la barra hacia el cuello', 'Mantén los codos tucked']
  },
  {
    id: 't14',
    name: 'Extensiones en Máquina',
    difficulty: 2,
    description: 'Ejercicio guiado y seguro.',
    muscles: ['Tríceps'],
    tips: ['Ajusta bien el asiento', 'Mantén la espalda apoyada']
  },
  {
    id: 't15',
    name: 'Extensiones con Banda',
    difficulty: 2,
    description: 'Ejercicio versátil con banda elástica.',
    muscles: ['Tríceps'],
    tips: ['Mantén tensión en la banda', 'Control en el retorno']
  }
],
// En ExercisesScreen.js, dentro del objeto exercises

"cuádriceps": [
  {
    id: 'quad_1',
    name: 'Sentadilla con Barra',
    difficulty: 4,
    description: 'Ejercicio compuesto que trabaja principalmente los cuádriceps y glúteos.',
    musclesWorked: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'],
    tips: [
      'Mantén la espalda recta',
      'Las rodillas no deben sobrepasar la punta de los pies',
      'Respira profundo antes de bajar y exhala al subir'
    ]
  },
  {
    id: 'quad_2',
    name: 'Prensa de Piernas',
    difficulty: 3,
    description: 'Ejercicio en máquina que aísla el trabajo de los cuádriceps.',
    musclesWorked: ['Cuádriceps', 'Glúteos'],
    tips: [
      'Ajusta el asiento para mantener la espalda baja pegada',
      'No bloquees las rodillas al extender',
      'Controla el movimiento en ambas direcciones'
    ]
  },
  {
    id: 'quad_3',
    name: 'Extensiones de Pierna',
    difficulty: 2,
    description: 'Ejercicio de aislamiento para cuádriceps en máquina.',
    musclesWorked: ['Cuádriceps'],
    tips: [
      'Mantén la espalda contra el respaldo',
      'Extiende completamente la pierna',
      'Controla el peso al bajar'
    ]
  },
  {
    id: 'quad_4',
    name: 'Sentadilla Búlgara',
    difficulty: 4,
    description: 'Ejercicio unilateral que trabaja cuádriceps y equilibrio.',
    musclesWorked: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'],
    tips: [
      'Mantén el pie delantero firme',
      'La rodilla no debe pasar la punta del pie',
      'Mantén el torso erguido'
    ]
  },
  {
    id: 'quad_5',
    name: 'Hack Squat',
    difficulty: 3,
    description: 'Variación de sentadilla en máquina que enfoca el trabajo en cuádriceps.',
    musclesWorked: ['Cuádriceps', 'Glúteos'],
    tips: [
      'Mantén los pies planos',
      'Controla el descenso',
      'Empuja a través de los talones'
    ]
  },
  {
    id: 'quad_6',
    name: 'Sentadilla Frontal',
    difficulty: 4,
    description: 'Variación de sentadilla con la barra al frente.',
    musclesWorked: ['Cuádriceps', 'Core'],
    tips: [
      'Mantén los codos elevados',
      'El torso debe permanecer vertical',
      'Respira adecuadamente durante el movimiento'
    ]
  },
  {
    id: 'quad_7',
    name: 'Zancadas Caminando',
    difficulty: 3,
    description: 'Ejercicio dinámico que trabaja piernas de forma unilateral.',
    musclesWorked: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'],
    tips: [
      'Da pasos largos y controlados',
      'Mantén el torso erguido',
      'Alterna las piernas de forma fluida'
    ]
  },
  {
    id: 'quad_8',
    name: 'Sentadilla Sissy',
    difficulty: 3,
    description: 'Ejercicio avanzado que enfoca el trabajo en la parte frontal del muslo.',
    musclesWorked: ['Cuádriceps'],
    tips: [
      'Mantén el equilibrio con ayuda de un soporte',
      'Desciende de forma controlada',
      'No fuerces más allá de tu flexibilidad'
    ]
  },
  {
    id: 'quad_9',
    name: 'Step-Ups',
    difficulty: 2,
    description: 'Ejercicio funcional que trabaja piernas y equilibrio.',
    musclesWorked: ['Cuádriceps', 'Glúteos'],
    tips: [
      'Usa una altura apropiada para tu nivel',
      'Empuja con el pie de la plataforma',
      'Mantén el core estable'
    ]
  },
  {
    id: 'quad_10',
    name: 'Sentadilla en Smith',
    difficulty: 2,
    description: 'Variación de sentadilla guiada en máquina Smith.',
    musclesWorked: ['Cuádriceps', 'Glúteos'],
    tips: [
      'Ajusta la posición de los pies',
      'Mantén la forma correcta',
      'Usa un rango de movimiento completo'
    ]
  },
  {
    id: 'quad_11',
    name: 'Sentadilla con Mancuernas',
    difficulty: 3,
    description: 'Variación de sentadilla usando mancuernas como peso.',
    musclesWorked: ['Cuádriceps', 'Glúteos', 'Core'],
    tips: [
      'Mantén las mancuernas a los lados',
      'Espalda recta durante todo el movimiento',
      'Respira de manera controlada'
    ]
  },
  {
    id: 'quad_12',
    name: 'Sentadilla Sumo',
    difficulty: 3,
    description: 'Variación de sentadilla con stance ancho.',
    musclesWorked: ['Cuádriceps', 'Glúteos', 'Aductores'],
    tips: [
      'Coloca los pies más allá del ancho de hombros',
      'Apunta los pies hacia afuera',
      'Mantén las rodillas alineadas con los pies'
    ]
  },
  {
    id: 'quad_13',
    name: 'Prensa Unilateral',
    difficulty: 3,
    description: 'Ejercicio de prensa realizado con una sola pierna.',
    musclesWorked: ['Cuádriceps', 'Glúteos'],
    tips: [
      'Mantén la espalda pegada al respaldo',
      'No bloquees la rodilla al extender',
      'Controla el movimiento en todo momento'
    ]
  },
  {
    id: 'quad_14',
    name: 'Sentadilla con Salto',
    difficulty: 4,
    description: 'Ejercicio pliométrico para potencia de piernas.',
    musclesWorked: ['Cuádriceps', 'Glúteos', 'Pantorrillas'],
    tips: [
      'Aterriza suavemente',
      'Usa los brazos para el impulso',
      'Mantén el control en cada repetición'
    ]
  },
  {
    id: 'quad_15',
    name: 'Zancadas Estáticas',
    difficulty: 2,
    description: 'Ejercicio de piernas en posición estática.',
    musclesWorked: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'],
    tips: [
      'Mantén la postura erguida',
      'La rodilla trasera casi toca el suelo',
      'Mantén el peso distribuido uniformemente'
    ]
  }
],
"isquiotibiales": [
  {
    id: 'ham_1',
    name: 'Peso Muerto',
    difficulty: 4,
    description: 'Ejercicio compuesto fundamental para el desarrollo posterior de las piernas.',
    musclesWorked: ['Isquiotibiales', 'Glúteos', 'Espalda baja'],
    tips: [
      'Mantén la espalda recta',
      'Empuja las caderas hacia atrás',
      'Mantén la barra cerca del cuerpo'
    ]
  },
  {
    id: 'ham_2',
    name: 'Curl de Piernas Acostado',
    difficulty: 2,
    description: 'Ejercicio de aislamiento para isquiotibiales en máquina.',
    musclesWorked: ['Isquiotibiales'],
    tips: [
      'Mantén las caderas pegadas al banco',
      'Contrae completamente los isquiotibiales',
      'Controla el movimiento de retorno'
    ]
  },
  {
    id: 'ham_3',
    name: 'Buenos Días',
    difficulty: 3,
    description: 'Ejercicio con barra que enfoca el trabajo en la cadena posterior.',
    musclesWorked: ['Isquiotibiales', 'Espalda baja', 'Glúteos'],
    tips: [
      'Mantén las rodillas ligeramente flexionadas',
      'Inclínate desde las caderas',
      'Mantén la espalda recta durante todo el movimiento'
    ]
  },
  {
    id: 'ham_4',
    name: 'Peso Muerto Rumano',
    difficulty: 3,
    description: 'Variación del peso muerto que enfatiza los isquiotibiales.',
    musclesWorked: ['Isquiotibiales', 'Glúteos', 'Espalda baja'],
    tips: [
      'Mantén las piernas casi extendidas',
      'Baja la barra rozando las piernas',
      'Empuja las caderas hacia atrás'
    ]
  },
  {
    id: 'ham_5',
    name: 'Curl de Piernas Sentado',
    difficulty: 2,
    description: 'Ejercicio de aislamiento en máquina para isquiotibiales.',
    musclesWorked: ['Isquiotibiales'],
    tips: [
      'Ajusta el respaldo para alinear las rodillas',
      'Contrae completamente los isquiotibiales',
      'Mantén los pies en posición neutral'
    ]
  },
  {
    id: 'ham_6',
    name: 'Peso Muerto a Una Pierna',
    difficulty: 4,
    description: 'Ejercicio unilateral que trabaja balance y fuerza.',
    musclesWorked: ['Isquiotibiales', 'Glúteos', 'Core'],
    tips: [
      'Mantén la pierna de apoyo ligeramente flexionada',
      'Inclínate desde la cadera',
      'Mantén el equilibrio durante todo el movimiento'
    ]
  },
  {
    id: 'ham_7',
    name: 'Puente de Glúteos',
    difficulty: 2,
    description: 'Ejercicio corporal que trabaja la cadena posterior.',
    musclesWorked: ['Isquiotibiales', 'Glúteos', 'Espalda baja'],
    tips: [
      'Mantén los pies plantados firmemente',
      'Eleva las caderas completamente',
      'Aprieta glúteos en la parte superior'
    ]
  },
  {
    id: 'ham_8',
    name: 'Curl Nórdico',
    difficulty: 5,
    description: 'Ejercicio avanzado de peso corporal para isquiotibiales.',
    musclesWorked: ['Isquiotibiales'],
    tips: [
      'Comienza con asistencia si es necesario',
      'Mantén las caderas extendidas',
      'Controla el descenso lo más posible'
    ]
  },
  {
    id: 'ham_9',
    name: 'Peso Muerto con Piernas Rígidas',
    difficulty: 4,
    description: 'Variación del peso muerto que maximiza el estiramiento.',
    musclesWorked: ['Isquiotibiales', 'Espalda baja'],
    tips: [
      'Mantén las piernas rectas pero no bloqueadas',
      'Inclínate desde las caderas',
      'Mantén la espalda recta'
    ]
  },
  {
    id: 'ham_10',
    name: 'Curl de Piernas de Pie',
    difficulty: 2,
    description: 'Ejercicio de aislamiento en máquina realizado de pie.',
    musclesWorked: ['Isquiotibiales'],
    tips: [
      'Mantén el torso pegado a la almohadilla',
      'Contrae completamente el isquiotibial',
      'Controla el retorno del peso'
    ]
  },
  {
    id: 'ham_11',
    name: 'Peso Muerto Sumo',
    difficulty: 4,
    description: 'Variación del peso muerto con stance ancho.',
    musclesWorked: ['Isquiotibiales', 'Glúteos', 'Aductores'],
    tips: [
      'Coloca los pies más allá del ancho de hombros',
      'Mantén la espalda recta',
      'Agarra la barra por dentro de las piernas'
    ]
  },
  {
    id: 'ham_12',
    name: 'Hiperextensiones',
    difficulty: 2,
    description: 'Ejercicio para fortalecer la cadena posterior.',
    musclesWorked: ['Isquiotibiales', 'Glúteos', 'Espalda baja'],
    tips: [
      'Ajusta el banco a tu altura',
      'Mantén una ligera curva en la espalda',
      'No hiperextiendas el cuello'
    ]
  },
  {
    id: 'ham_13',
    name: 'Peso Muerto con Mancuernas',
    difficulty: 3,
    description: 'Variación del peso muerto usando mancuernas.',
    musclesWorked: ['Isquiotibiales', 'Glúteos', 'Espalda baja'],
    tips: [
      'Mantén las mancuernas cerca de las piernas',
      'Empuja las caderas hacia atrás',
      'Mantén la espalda recta'
    ]
  },
  {
    id: 'ham_14',
    name: 'Puente de Glúteos con Curl',
    difficulty: 3,
    description: 'Combinación de puente y curl de piernas.',
    musclesWorked: ['Isquiotibiales', 'Glúteos'],
    tips: [
      'Mantén las caderas elevadas',
      'Desliza los pies hacia dentro',
      'Mantén la tensión en los isquiotibiales'
    ]
  },
  {
    id: 'ham_15',
    name: 'Peso Muerto en Barra Smith',
    difficulty: 3,
    description: 'Peso muerto realizado en máquina Smith.',
    musclesWorked: ['Isquiotibiales', 'Glúteos', 'Espalda baja'],
    tips: [
      'Ajusta la posición de los pies',
      'Mantén la trayectoria de la barra recta',
      'Empuja las caderas hacia atrás'
    ]
  }
],
"glúteos": [
  {
    id: 'glut_1',
    name: 'Hip Thrust',
    difficulty: 3,
    description: 'Ejercicio fundamental para el desarrollo de glúteos.',
    musclesWorked: ['Glúteos', 'Isquiotibiales'],
    tips: [
      'Apoya los omóplatos en el banco',
      'Empuja a través de los talones',
      'Mantén el mentón tucked'
    ]
  },
  {
    id: 'glut_2',
    name: 'Empuje de Cadera en Máquina',
    difficulty: 2,
    description: 'Variación del hip thrust en máquina específica.',
    musclesWorked: ['Glúteos'],
    tips: [
      'Ajusta la máquina a tu altura',
      'Mantén los pies plantados firmemente',
      'Contrae los glúteos en la parte superior'
    ]
  },
  {
    id: 'glut_3',
    name: 'Patada de Glúteos en Polea',
    difficulty: 2,
    description: 'Ejercicio de aislamiento para glúteos.',
    musclesWorked: ['Glúteos'],
    tips: [
      'Mantén la pierna de apoyo ligeramente flexionada',
      'No arquees la espalda',
      'Contrae el glúteo en la extensión'
    ]
  },
  {
    id: 'glut_4',
    name: 'Elevación de Cadera a Una Pierna',
    difficulty: 3,
    description: 'Variación unilateral del hip thrust.',
    musclesWorked: ['Glúteos', 'Isquiotibiales'],
    tips: [
      'Mantén la pierna elevada recta',
      'Empuja a través del talón',
      'Mantén las caderas niveladas'
    ]
  },
  {
    id: 'glut_5',
    name: 'Sentadilla Sumo',
    difficulty: 3,
    description: 'Variación de sentadilla que enfatiza glúteos.',
    musclesWorked: ['Glúteos', 'Cuádriceps', 'Aductores'],
    tips: [
      'Stance ancho con pies hacia afuera',
      'Mantén el pecho alto',
      'Empuja las rodillas hacia afuera'
    ]
  },
  {
    id: 'glut_6',
    name: 'Abducción de Cadera',
    difficulty: 2,
    description: 'Ejercicio de aislamiento en máquina.',
    musclesWorked: ['Glúteos', 'Abductores'],
    tips: [
      'Mantén la espalda recta',
      'No uses impulso',
      'Contrae los glúteos en cada repetición'
    ]
  },
  {
    id: 'glut_7',
    name: 'Step-Up con Peso',
    difficulty: 3,
    description: 'Ejercicio funcional para glúteos y piernas.',
    musclesWorked: ['Glúteos', 'Cuádriceps'],
    tips: [
      'Usa una altura apropiada',
      'Empuja a través del talón',
      'Mantén el torso erguido'
    ]
  },
  {
    id: 'glut_8',
    name: 'Buenos Días',
    difficulty: 3,
    description: 'Ejercicio compuesto para glúteos y cadena posterior.',
    musclesWorked: ['Glúteos', 'Isquiotibiales', 'Espalda baja'],
    tips: [
      'Mantén las rodillas ligeramente flexionadas',
      'Inclínate desde las caderas',
      'Mantén la espalda recta'
    ]
  },
  {
    id: 'glut_9',
    name: 'Puente de Glúteos con Banda',
    difficulty: 2,
    description: 'Variación del puente usando banda elástica.',
    musclesWorked: ['Glúteos', 'Isquiotibiales'],
    tips: [
      'Coloca la banda sobre las caderas',
      'Mantén los pies plantados',
      'Aprieta los glúteos en la parte superior'
    ]
  },
  {
    id: 'glut_10',
    name: 'Caminata Lateral con Banda',
    difficulty: 2,
    description: 'Ejercicio de activación de glúteos.',
    musclesWorked: ['Glúteos', 'Abductores'],
    tips: [
      'Mantén tensión constante en la banda',
      'Da pasos controlados',
      'Mantén las rodillas ligeramente flexionadas'
    ]
  },
  {
    id: 'glut_11',
    name: 'Peso Muerto Americano',
    difficulty: 4,
    description: 'Variación del peso muerto que enfatiza glúteos.',
    musclesWorked: ['Glúteos', 'Isquiotibiales'],
    tips: [
      'Mantén la barra cerca del cuerpo',
      'Empuja las caderas hacia atrás',
      'Extiende completamente las caderas'
    ]
  },
  {
    id: 'glut_12',
    name: 'Patada de Burro',
    difficulty: 2,
    description: 'Ejercicio de aislamiento para glúteos.',
    musclesWorked: ['Glúteos'],
    tips: [
      'Mantén la pierna de trabajo flexionada',
      'No arquees la espalda',
      'Contrae el glúteo en cada repetición'
    ]
  },
  {
    id: 'glut_13',
    name: 'Zancada Lateral',
    difficulty: 3,
    description: 'Ejercicio funcional para glúteos y aductores.',
    musclesWorked: ['Glúteos', 'Aductores'],
    tips: [
      'Da un paso amplio hacia el lado',
      'Mantén el torso erguido',
      'Empuja con la pierna de trabajo'
    ]
  },
  {
    id: 'glut_14',
    name: 'Hip Thrust con Banda',
    difficulty: 3,
    description: 'Variación del hip thrust con banda elástica.',
    musclesWorked: ['Glúteos', 'Isquiotibiales'],
    tips: [
      'Coloca la banda sobre las caderas',
      'Mantén tensión constante',
      'Aprieta los glúteos en la parte superior'
    ]
  },
  {
    id: 'glut_15',
    name: 'Sentadilla Curtsy',
    difficulty: 3,
    description: 'Variación de zancada que enfatiza glúteos.',
    musclesWorked: ['Glúteos', 'Cuádriceps'],
    tips: [
      'Cruza la pierna por detrás',
      'Mantén el torso erguido',
      'Baja hasta donde mantengas el control'
    ]
  }
],
"gemelos": [
  {
    id: 'calv_1',
    name: 'Elevación de Talones de Pie',
    difficulty: 2,
    description: 'Ejercicio básico para el desarrollo de pantorrillas.',
    musclesWorked: ['Gemelos'],
    tips: [
      'Extiende completamente el tobillo',
      'Mantén las rodillas rectas',
      'Haz una pausa en la posición contraída'
    ]
  },
  {
    id: 'calv_2',
    name: 'Elevación de Talones Sentado',
    difficulty: 2,
    description: 'Ejercicio de aislamiento para gemelos en máquina.',
    musclesWorked: ['Gemelos', 'Sóleo'],
    tips: [
      'Mantén las rodillas a 90 grados',
      'No uses rebote',
      'Contrae completamente en cada repetición'
    ]
  },
  {
    id: 'calv_3',
    name: 'Elevación de Talones en Prensa',
    difficulty: 3,
    description: 'Variación de elevación de talones en máquina de prensa.',
    musclesWorked: ['Gemelos'],
    tips: [
      'Coloca los pies en la parte baja de la plataforma',
      'Mantén las rodillas ligeramente flexionadas',
      'Usa rango completo de movimiento'
    ]
  },
  {
    id: 'calv_4',
    name: 'Elevación de Talón a Una Pierna',
    difficulty: 3,
    description: 'Ejercicio unilateral para gemelos.',
    musclesWorked: ['Gemelos', 'Estabilizadores'],
    tips: [
      'Mantén el equilibrio',
      'Usa apoyo ligero si es necesario',
      'Contrae completamente el gemelo'
    ]
  },
  {
    id: 'calv_5',
    name: 'Saltos de Pantorrilla',
    difficulty: 3,
    description: 'Ejercicio pliométrico para gemelos.',
    musclesWorked: ['Gemelos', 'Sóleo'],
    tips: [
      'Salta principalmente desde los tobillos',
      'Aterriza suavemente',
      'Mantén las rodillas ligeramente flexionadas'
    ]
  },
  {
    id: 'calv_6',
    name: 'Elevación de Talones con Mancuerna',
    difficulty: 2,
    description: 'Ejercicio de gemelos con peso libre.',
    musclesWorked: ['Gemelos'],
    tips: [
      'Mantén la mancuerna cerca del cuerpo',
      'Usa un escalón o plataforma',
      'Controla el movimiento'
    ]
  },
  {
    id: 'calv_7',
    name: 'Elevación de Talones en Smith',
    difficulty: 2,
    description: 'Variación en máquina Smith para gemelos.',
    musclesWorked: ['Gemelos'],
    tips: [
      'Coloca los pies correctamente bajo la barra',
      'Mantén las rodillas rectas',
      'Usa un bloque o plataforma'
    ]
  },
  {
    id: 'calv_8',
    name: 'Caminata de Puntillas',
    difficulty: 1,
    description: 'Ejercicio de resistencia para gemelos.',
    musclesWorked: ['Gemelos', 'Estabilizadores'],
    tips: [
      'Mantente en puntillas todo el tiempo',
      'Camina de forma controlada',
      'Mantén una postura erguida'
    ]
  },
  {
    id: 'calv_9',
    name: 'Elevación de Talones Burro',
    difficulty: 3,
    description: 'Ejercicio tradicional para gemelos.',
    musclesWorked: ['Gemelos'],
    tips: [
      'Mantén la espalda recta',
      'No balancees el cuerpo',
      'Usa peso adecuado'
    ]
  },
  {
    id: 'calv_10',
    name: 'Elevación de Talones con Banda',
    difficulty: 2,
    description: 'Ejercicio de gemelos con banda elástica.',
    musclesWorked: ['Gemelos'],
    tips: [
      'Asegura bien la banda',
      'Mantén tensión constante',
      'Contrae completamente en cada repetición'
    ]
  },
  {
    id: 'calv_11',
    name: 'Salto a la Comba',
    difficulty: 2,
    description: 'Ejercicio cardiovascular que trabaja gemelos.',
    musclesWorked: ['Gemelos', 'Sóleo'],
    tips: [
      'Salta desde los tobillos',
      'Mantén los saltos bajos y rápidos',
      'Mantén un ritmo constante'
    ]
  },
  {
    id: 'calv_12',
    name: 'Elevación de Talones Isométrica',
    difficulty: 2,
    description: 'Ejercicio estático para gemelos.',
    musclesWorked: ['Gemelos'],
    tips: [
      'Mantén la posición contraída',
      'Respira normalmente',
      'Aumenta gradualmente el tiempo'
    ]
  },
  {
    id: 'calv_13',
    name: 'Elevación de Talones en Escalón',
    difficulty: 2,
    description: 'Ejercicio básico con peso corporal.',
    musclesWorked: ['Gemelos', 'Sóleo'],
    tips: [
      'Usa un escalón estable',
      'Baja el talón por debajo del nivel',
      'Mantén el control en todo momento'
    ]
  },
  {
    id: 'calv_14',
    name: 'Elevación de Talones Tibial',
    difficulty: 2,
    description: 'Ejercicio para la parte frontal de la pierna.',
    musclesWorked: ['Tibial Anterior', 'Gemelos'],
    tips: [
      'Mantén el talón en el suelo',
      'Levanta la punta del pie',
      'Controla el movimiento'
    ]
  },
  {
    id: 'calv_15',
    name: 'Estiramiento Dinámico de Gemelos',
    difficulty: 1,
    description: 'Ejercicio de movilidad y activación.',
    musclesWorked: ['Gemelos', 'Sóleo'],
    tips: [
      'Alterna entre flexión y extensión',
      'Mantén cada posición brevemente',
      'No fuerces el estiramiento'
    ]
  }
],
"abdominales": [
  {
    id: 'a1',
    name: 'Crunch Básico',
    difficulty: 2,
    description: 'Ejercicio fundamental para abdominales superiores.',
    muscles: ['Recto abdominal superior'],
    tips: ['Mentón separado del pecho', 'Zona lumbar pegada al suelo']
  },
  {
    id: 'a2',
    name: 'Plancha',
    difficulty: 3,
    description: 'Ejercicio isométrico para todo el core.',
    muscles: ['Core', 'Recto abdominal', 'Oblicuos'],
    tips: ['Mantén el cuerpo alineado', 'Activa el core']
  },
  {
    id: 'a3',
    name: 'Elevaciones de Piernas',
    difficulty: 4,
    description: 'Trabaja abdominales inferiores.',
    muscles: ['Recto abdominal inferior'],
    tips: ['No balancees las piernas', 'Mantén la espalda baja pegada']
  },
  {
    id: 'a4',
    name: 'Russian Twist',
    difficulty: 3,
    description: 'Ejercicio rotacional para oblicuos.',
    muscles: ['Oblicuos', 'Core'],
    tips: ['Mantén los pies elevados', 'Gira desde la cintura']
  },
  {
    id: 'a5',
    name: 'Rueda Abdominal',
    difficulty: 5,
    description: 'Ejercicio avanzado para todo el core.',
    muscles: ['Core', 'Recto abdominal', 'Oblicuos'],
    tips: ['Mantén los brazos rectos', 'Control en el retorno']
  },
  {
    id: 'a6',
    name: 'Mountain Climbers',
    difficulty: 3,
    description: 'Ejercicio dinámico para abdominales.',
    muscles: ['Core', 'Recto abdominal'],
    tips: ['Mantén la posición de plancha', 'Alterna las rodillas rápidamente']
  },
  {
    id: 'a7',
    name: 'Crunch Invertido',
    difficulty: 3,
    description: 'Enfoca el trabajo en abdominales inferiores.',
    muscles: ['Recto abdominal inferior'],
    tips: ['Eleva las caderas del suelo', 'Control en el descenso']
  },
  {
    id: 'a8',
    name: 'Dragon Flag',
    difficulty: 5,
    description: 'Ejercicio avanzado de control corporal.',
    muscles: ['Core completo', 'Recto abdominal'],
    tips: ['Mantén el cuerpo rígido', 'Progresa gradualmente']
  },
  {
    id: 'a9',
    name: 'Pallof Press',
    difficulty: 3,
    description: 'Ejercicio anti-rotacional.',
    muscles: ['Core', 'Oblicuos'],
    tips: ['Resiste la rotación', 'Mantén las caderas quietas']
  },
  {
    id: 'a10',
    name: 'Hollow Hold',
    difficulty: 4,
    description: 'Ejercicio isométrico para control corporal.',
    muscles: ['Core completo'],
    tips: ['Mantén la espalda baja pegada', 'Piernas y brazos extendidos']
  },
  {
    id: 'a11',
    name: 'Crunch con Cable',
    difficulty: 3,
    description: 'Crunch con resistencia adicional.',
    muscles: ['Recto abdominal superior'],
    tips: ['Mantén la tensión constante', 'No tires con los brazos']
  },
  {
    id: 'a12',
    name: 'Plancha Lateral',
    difficulty: 3,
    description: 'Ejercicio para oblicuos y estabilidad.',
    muscles: ['Oblicuos', 'Core lateral'],
    tips: ['Mantén el cuerpo alineado', 'Cadera elevada']
  },
  {
    id: 'a13',
    name: 'Windshield Wipers',
    difficulty: 5,
    description: 'Ejercicio avanzado para oblicuos.',
    muscles: ['Oblicuos', 'Core'],
    tips: ['Control en el movimiento', 'Mantén las piernas juntas']
  },
  {
    id: 'a14',
    name: 'Dead Bug',
    difficulty: 2,
    description: 'Ejercicio de estabilidad y control.',
    muscles: ['Core', 'Recto abdominal'],
    tips: ['Mantén la espalda pegada', 'Mueve las extremidades con control']
  },
  {
    id: 'a15',
    name: 'Crunch en Polea Alta',
    difficulty: 3,
    description: 'Variación con resistencia constante.',
    muscles: ['Recto abdominal superior'],
    tips: ['No tires con los brazos', 'Contrae los abdominales']
  }
],
    // Aquí añadiremos más grupos musculares
  };

const ExercisesScreen = ({ route, navigation }) => {
  const { muscle } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    description: '',
    difficulty: 3,
  });const [exercises, setExercises] = useState(exercisesData[muscle.toLowerCase()] || []);
  const [userRatings, setUserRatings] = useState({});
  const [isFromRoutine, setIsFromRoutine] = useState(false);
const [routineData, setRoutineData] = useState(null);
  
React.useEffect(() => {
  const loadData = async () => {
    try {
      // Cargar calificaciones de usuario
      const savedRatings = await AsyncStorage.getItem('userRatings');
      if (savedRatings) {
        setUserRatings(JSON.parse(savedRatings));
      }

      // Verificar si venimos de una rutina
      if (route.params?.exercises && route.params?.fromRoutine) {
        setIsFromRoutine(true);
        setExercisesList(route.params.exercises);
        if (route.params.routineData) {
          setRoutineData(route.params.routineData);
        }
      } else {
        // Cargar ejercicios normales según el grupo muscular
        const muscleGroup = route.params?.muscleGroup;
        if (muscleGroup && exercisesData[muscleGroup]) {
          setExercisesList(exercisesData[muscleGroup]);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  loadData();
}, [route.params]);
  
  const handleRatingChange = async (exerciseId, newRating) => {
    try {
      const newUserRatings = {
        ...userRatings,
        [exerciseId]: newRating
      };
      setUserRatings(newUserRatings);
      
      await AsyncStorage.setItem('userRatings', JSON.stringify(newUserRatings));
      Alert.alert('Éxito', 'Calificación actualizada');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la calificación');
    }
  };
  
  const renderStars = (exercise) => {
    const rating = userRatings[exercise.id] || exercise.difficulty;
    
    return [...Array(5)].map((_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleRatingChange(exercise.id, index + 1)}
      >
        <AntDesign
          name={index < rating ? "star" : "staro"}
          size={20}
          color={index < rating ? "#FFD700" : "#ccc"}
        />
      </TouchableOpacity>
      
      
    ));
  };
  const handleExerciseComplete = async (exercise) => {
    try {
      // Crear objeto con los datos del ejercicio completado
      const completedExercise = {
        ...exercise,
        completedAt: new Date().toISOString(),
        rating: userRatings[exercise.id] || exercise.difficulty
      };
  
      // Si viene de una rutina, añadir datos de la rutina
      if (route.params?.fromRoutine) {
        completedExercise.fromRoutine = true;
        completedExercise.routineName = route.params?.title;
      }
  
      // Obtener historial existente
      const history = await AsyncStorage.getItem('exerciseHistory') || '[]';
      const historyArray = JSON.parse(history);
      
      // Añadir nuevo ejercicio al historial
      historyArray.push(completedExercise);
  
      // Guardar historial actualizado
      await AsyncStorage.setItem('exerciseHistory', JSON.stringify(historyArray));
      
      // Mostrar mensaje de éxito
      Alert.alert(
        'Ejercicio Completado',
        'El ejercicio ha sido guardado en tu historial',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error saving exercise:', error);
      Alert.alert('Error', 'No se pudo guardar el ejercicio');
    }
  };
  const addCustomExercise = async () => {
    if (!newExercise.name || !newExercise.description) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
  
    const customExercise = {
      id: `custom-${Date.now()}`,
      ...newExercise,
      custom: true,
    };
  
    try {
      const savedExercises = await AsyncStorage.getItem('customExercises');
      const customExercises = savedExercises ? JSON.parse(savedExercises) : {};
      
      if (!customExercises[muscle.toLowerCase()]) {
        customExercises[muscle.toLowerCase()] = [];
      }
      
      customExercises[muscle.toLowerCase()].push(customExercise);
      await AsyncStorage.setItem('customExercises', JSON.stringify(customExercises));
  
      setExercises([...exercises, customExercise]);
      setModalVisible(false);
      setNewExercise({ name: '', description: '', difficulty: 3 });
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el ejercicio');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ejercicios para {muscle}</Text>
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Añadir Ejercicio</Text>
      </TouchableOpacity>
  
      {exercises.map((exercise) => (
  <TouchableOpacity
    key={exercise.id}
    style={styles.exerciseCard}
    onPress={() => navigation.navigate('ExerciseDetail', { exercise })}
  >
    <View style={styles.exerciseInfo}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <View style={styles.starsContainer}>
        {renderStars(exercise)}
      </View>
      <Text style={styles.exerciseDescription}>
        {exercise.description.length > 100 
          ? exercise.description.substring(0, 100) + '...'
          : exercise.description}
      </Text>
      {exercise.custom && (
        <Text style={styles.customTag}>Personalizado</Text>
      )}
      {/* Añade el botón de completar ejercicio aquí */}
      <TouchableOpacity
        style={styles.completeButton}
        onPress={(e) => {
          e.stopPropagation(); // Esto evita que se active la navegación
          handleExerciseComplete(exercise);
        }}
      >
        <Text style={styles.completeButtonText}>Completar Ejercicio</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>

      ))}
  
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Añadir Ejercicio</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nombre del ejercicio"
              value={newExercise.name}
              onChangeText={(text) => setNewExercise({...newExercise, name: text})}
            />
  
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descripción"
              multiline
              numberOfLines={4}
              value={newExercise.description}
              onChangeText={(text) => setNewExercise({...newExercise, description: text})}
            />
  
            <View style={styles.difficultyContainer}>
              <Text>Dificultad: </Text>
              {[1,2,3,4,5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setNewExercise({...newExercise, difficulty: star})}
                >
                  <AntDesign
                    name={star <= newExercise.difficulty ? "star" : "staro"}
                    size={24}
                    color="#FFD700"
                  />
                </TouchableOpacity>
              ))}
            </View>
  
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={addCustomExercise}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    addButton: {
      backgroundColor: '#4CAF50',
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
      alignItems: 'center',
    },
    addButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    exerciseCard: {
      backgroundColor: 'white',
      borderRadius: 10,
      marginBottom: 15,
      overflow: 'hidden',
      elevation: 3,
    },
    exerciseInfo: {
      padding: 15,
    },
    exerciseName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    exerciseDescription: {
      color: '#666',
      marginTop: 5,
    },
    starsContainer: {
      flexDirection: 'row',
      marginTop: 5,
    },
    customTag: {
      color: '#2196F3',
      fontSize: 12,
      marginTop: 5,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      width: '90%',
      maxHeight: '80%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      padding: 10,
      marginBottom: 15,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    difficultyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButton: {
      flex: 1,
      padding: 15,
      borderRadius: 10,
      marginHorizontal: 5,
    },
    cancelButton: {
      backgroundColor: '#ff6b6b',
    },
    saveButton: {
      backgroundColor: '#4CAF50',
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },

      completeButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'stretch',
      },
      completeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
      },
   

  });
  
  export default ExercisesScreen;