import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Asegúrate de que la ruta a tu archivo firebase.js es correcta

const exercisesData = [
    // Pecho
    {
        name: "Press de Banca Plano",
        description: "Acostado en un banco plano, levanta una barra cargada desde el pecho hasta que los brazos estén completamente extendidos. Esencial para desarrollar la masa del pectoral.",
        sets: 3,
        reps: 8,
        weight: null, // El usuario ingresará el peso
        muscle: "Pecho",
        stars: 5,
        dropset: false,
        restpause: false,
        howToDo: "1. Acuéstate en un banco plano con los pies firmes en el suelo. 2. Agarra la barra con un agarre medio, un poco más ancho que el ancho de los hombros. 3. Desciende la barra controladamente hasta que toque el pecho. 4. Empuja la barra hacia arriba hasta la posición inicial, extendiendo completamente los brazos."
    },
    {
        name: "Press de Banca Inclinado",
        description: "Realizado en un banco inclinado, este ejercicio enfatiza la parte superior del pecho. La inclinación ayuda a esculpir y definir la zona superior pectoral.",
        sets: 3,
        reps: 8,
        weight: null, // El usuario ingresará el peso
        muscle: "Pecho",
        stars: 5,
        dropset: false,
        restpause: false,
        howToDo: "1. Ajusta un banco a un ángulo inclinado de 30-45 grados. 2. Acuéstate con la espalda apoyada en el banco. 3. Levanta la barra o mancuernas desde el pecho superior. 4. Extiende los brazos completamente, luego baja el peso de manera controlada."
    },
    {
        name: "Press de Banca Declinado",
        description: "Este ejercicio se enfoca en la parte inferior del pecho. Al declinar el banco, se activa más intensamente esta área específica.",
        sets: 3,
        reps: 8,
        weight: null, // El usuario ingresará el peso
        muscle: "Pecho",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Ajusta un banco en posición declinada. 2. Acuéstate con la cabeza más baja que los pies. 3. Levanta la barra o mancuernas desde el pecho inferior. 4. Extiende los brazos y luego baja el peso de forma controlada."
    },
    {
        name: "Aperturas con Mancuernas",
        description: "Este ejercicio se realiza acostado en un banco, abriendo y cerrando los brazos con mancuernas. Ideal para estirar y contraer los músculos del pecho.",
        sets: 3,
        reps: 12,
        weight: null, // El usuario ingresará el peso
        muscle: "Pecho",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Acuéstate en un banco plano con una mancuerna en cada mano. 2. Extiende los brazos hacia arriba, con una ligera flexión en los codos. 3. Abre los brazos hacia los lados en un arco amplio. 4. Vuelve a la posición inicial, apretando los músculos del pecho."
    },
    {
        name: "Flexiones (Push-ups)",
        description: "Un ejercicio clásico de peso corporal que trabaja todo el pecho, además de los hombros y tríceps. Es adaptable para todos los niveles de fitness.",
        sets: 3,
        reps: 15,
        weight: "Peso corporal",
        muscle: "Pecho",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Colócate en posición de plancha con las manos un poco más anchas que los hombros. 2. Baja el cuerpo hasta que el pecho casi toque el suelo. 3. Empuja hacia arriba hasta la posición inicial. 4. Mantén el cuerpo recto durante todo el movimiento."
    },
    {
        name: "Cruces en Polea Alta",
        description: "De pie, usa poleas para realizar un movimiento de cruce, trabajando el pecho. Este ejercicio ayuda a mejorar la definición y simetría del pecho.",
        sets: 3,
        reps: 15,
        weight: null, // El usuario ingresará el peso
        muscle: "Pecho",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Colócate entre dos poleas altas, agarrando un mango en cada mano. 2. Da un paso adelante para crear tensión. 3. Con una ligera flexión en los codos, junta las manos frente al pecho. 4. Regresa lentamente a la posición inicial."
    },
    {
        name: "Pullover con Mancuerna",
        description: "Acostado en un banco, este ejercicio estira y trabaja el pecho y los dorsales. Mejora la flexibilidad y la expansión de la caja torácica.",
        sets: 3,
        reps: 12,
        weight: null, // El usuario ingresará el peso
        muscle: "Pecho",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Acuéstate perpendicularmente sobre un banco, con solo los hombros apoyados. 2. Sostén una mancuerna sobre el pecho con ambas manos. 3. Baja la mancuerna por detrás de la cabeza en un arco. 4. Levanta la mancuerna hasta la posición inicial, utilizando los músculos del pecho y la espalda."
    },
    {
        name: "Press con Mancuernas en Banco Plano",
        description: "Similar al press de banca con barra, pero usando mancuernas. Ofrece un mayor rango de movimiento y un trabajo más intenso en los músculos estabilizadores.",
        sets: 3,
        reps: 10,
        weight: null, // El usuario ingresará el peso
        muscle: "Pecho",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Acuéstate en un banco plano con una mancuerna en cada mano. 2. Sostén las mancuernas a la altura del pecho. 3. Empuja las mancuernas hacia arriba hasta extender los brazos. 4. Baja las mancuernas de manera controlada hasta la posición inicial."
    },
    {
        name: "Flexiones Declinadas",
        description: "Realizando flexiones con los pies elevados, se incrementa la carga sobre la parte superior del pecho y los hombros.",
        sets: 3,
        reps: 12,
        weight: "Peso corporal",
        muscle: "Pecho",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Coloca los pies sobre una superficie elevada y las manos en el suelo. 2. Realiza flexiones manteniendo el cuerpo recto. 3. Baja el pecho hacia el suelo y luego empuja hacia arriba. 4. Mantén el core apretado durante todo el movimiento."
    },
    {
        name: "Flexiones Inclinadas",
        description: "Con las manos en una superficie elevada, este tipo de flexión es más fácil que la estándar y se enfoca en la parte inferior del pecho.",
        sets: 3,
        reps: 12,
        weight: "Peso corporal",
        muscle: "Pecho",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Coloca las manos sobre una superficie elevada y los pies en el suelo. 2. Realiza flexiones manteniendo el cuerpo recto. 3. Baja el pecho hacia la superficie elevada y luego empuja hacia arriba. 4. Mantén el core apretado durante todo el movimiento."
    },
    {
        name: "Aperturas en Máquina (Pec Deck)",
        description: "Realizado en una máquina de pec deck, este ejercicio aísla los músculos del pecho, mejorando su forma y definición.",
        sets: 3,
        reps: 15,
        weight: null, // El usuario ingresará el peso
        muscle: "Pecho",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Siéntate en la máquina de pec deck con la espalda apoyada. 2. Agarra las asas y junta los brazos frente al pecho. 3. Controla el movimiento al abrir y cerrar los brazos. 4. Mantén la tensión en los músculos del pecho durante todo el ejercicio."
    },
    {
        name: "Press de Banca con Agarre Cerrado",
        description: "Una variación del press de banca que pone más énfasis en los tríceps y la parte interna del pecho.",
        sets: 3,
        reps: 8,
        weight: null, // El usuario ingresará el peso
        muscle: "Pecho",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Acuéstate en un banco plano y agarra la barra con un agarre más estrecho que el ancho de los hombros. 2. Baja la barra hasta el pecho. 3. Empuja la barra hacia arriba hasta que los brazos estén completamente extendidos. 4. Mantén los codos cerca del cuerpo durante todo el movimiento."
    },
    {
        name: "Dips en Paralelas",
        description: "Un ejercicio avanzado que trabaja intensamente el pecho, especialmente la parte inferior, además de los tríceps y hombros.",
        sets: 3,
        reps: 10,
        weight: "Peso corporal",
        muscle: "Pecho",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Sostente en barras paralelas con los brazos extendidos. 2. Inclínate ligeramente hacia adelante. 3. Baja el cuerpo doblando los codos hasta que los hombros estén por debajo de los codos. 4. Empuja hacia arriba hasta la posición inicial, extendiendo los brazos."
    },
    {
        name: "Press con Mancuernas Inclinado",
        description: "Similar al press inclinado con barra, pero con mancuernas, permitiendo un mayor rango de movimiento y activación de músculos estabilizadores.",
        sets: 3,
        reps: 10,
        weight: null, // El usuario ingresará el peso
        muscle: "Pecho",
        stars: 5,
        dropset: false,
        restpause: false,
        howToDo: "1. Ajusta un banco a un ángulo inclinado. 2. Acuéstate con una mancuerna en cada mano a la altura del pecho superior. 3. Empuja las mancuernas hacia arriba hasta extender los brazos. 4. Baja las mancuernas de manera controlada hasta la posición inicial."
    },
    {
        name: "Cruces en Polea Baja",
        description: "Utilizando poleas bajas, este ejercicio se enfoca en la parte superior del pecho y ayuda a mejorar la definición muscular.",
        sets: 3,
        reps: 15,
        weight: null, // El usuario ingresará el peso
        muscle: "Pecho",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Colócate entre dos poleas bajas, agarrando un mango en cada mano. 2. Manteniendo una ligera flexión en los codos, junta las manos arriba y frente al pecho. 3. Controla el movimiento al abrir y cerrar los brazos. 4. Concéntrate en apretar los músculos del pecho en cada repetición."
    },
// Espalda
{
    name: "Dominadas",
    description: "Un ejercicio compuesto fundamental para la espalda, trabajando principalmente el dorsal ancho, además de bíceps y antebrazos.",
    sets: 3,
    reps: 8,
    weight: "Peso corporal",
    muscle: "Espalda",
    stars: 5,
    dropset: false,
    restpause: false,
    howToDo: "1. Agarra una barra de dominadas con un agarre prono, manos más anchas que los hombros. 2. Cuélgate de la barra con los brazos extendidos. 3. Tira del cuerpo hacia arriba hasta que la barbilla supere la barra. 4. Baja lentamente a la posición inicial."
},
{
    name: "Remo con Barra",
    description: "Ejercicio clave para desarrollar grosor en la espalda media. Trabaja los dorsales, romboides, trapecio y bíceps.",
    sets: 3,
    reps: 8,
    weight: null, // El usuario ingresará el peso
    muscle: "Espalda",
    stars: 5,
    dropset: false,
    restpause: false,
    howToDo: "1. Con los pies al ancho de los hombros, inclínate y agarra una barra con agarre prono. 2. Mantén la espalda recta y tira de la barra hacia el abdomen. 3. Aprieta los músculos de la espalda en la parte superior. 4. Baja la barra de forma controlada."
},
{
    name: "Remo con Mancuerna",
    description: "Permite trabajar cada lado de la espalda de forma individual, ideal para corregir desequilibrios de fuerza y mejorar la simetría.",
    sets: 3,
    reps: 10,
    weight: null, // El usuario ingresará el peso
    muscle: "Espalda",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Apoya una mano y una rodilla en un banco, manteniendo la espalda recta. 2. Con la otra mano, agarra una mancuerna del suelo. 3. Tira de la mancuerna hacia el pecho, manteniendo el codo cerca del cuerpo. 4. Baja la mancuerna de forma controlada."
},
{
    name: "Peso Muerto",
    description: "Ejercicio compuesto que involucra múltiples grupos musculares, incluyendo la espalda baja, glúteos, isquiotibiales y trapecios.",
    sets: 1,
    reps: 5,
    weight: null, // El usuario ingresará el peso
    muscle: "Espalda",
    stars: 5,
    dropset: false,
    restpause: false,
    howToDo: "1. Colócate frente a una barra cargada, pies al ancho de las caderas. 2. Agáchate y agarra la barra con un agarre mixto o prono. 3. Mantén la espalda recta y el pecho elevado. 4. Levanta la barra extendiendo las piernas y la espalda simultáneamente. 5. Baja la barra de forma controlada."
},
{
    name: "Jalón al Pecho",
    description: "Excelente para trabajar el dorsal ancho y los músculos de la espalda media, utilizando una máquina de polea alta.",
    sets: 3,
    reps: 10,
    weight: null, // El usuario ingresará el peso
    muscle: "Espalda",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Siéntate en la máquina de jalón al pecho, ajustando el asiento y la barra. 2. Agarra la barra con un agarre ancho. 3. Tira de la barra hacia abajo hasta que toque la parte superior del pecho. 4. Retorna la barra a la posición inicial de forma controlada."
},
{
    name: "Remo en Polea Baja",
    description: "Trabaja la espalda media e inferior, mejorando la postura y el grosor de la espalda.",
    sets: 3,
    reps: 10,
    weight: null, // El usuario ingresará el peso
    muscle: "Espalda",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Siéntate en la máquina de remo en polea baja, con los pies apoyados y las rodillas ligeramente flexionadas. 2. Agarra el mango con ambas manos. 3. Tira del mango hacia el abdomen, manteniendo la espalda recta. 4. Retorna a la posición inicial de forma controlada."
},
{
    name: "Hiperextensiones",
    description: "Fortalece la espalda baja y mejora la estabilidad del core. También trabaja los glúteos e isquiotibiales.",
    sets: 3,
    reps: 15,
    weight: "Peso corporal",
    muscle: "Espalda",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Acuéstate boca abajo en un banco de hiperextensiones, con los muslos apoyados en la almohadilla. 2. Cruza los brazos sobre el pecho o colócalos detrás de la cabeza. 3. Baja la parte superior del cuerpo hacia el suelo, manteniendo la espalda recta. 4. Levanta la parte superior del cuerpo hasta que esté alineada con las piernas."
},
{
    name: "Buenos Días",
    description: "Un ejercicio que trabaja la espalda baja, los glúteos y los isquiotibiales.",
    sets: 3,
    reps: 10,
    weight: null, // El usuario ingresará el peso
    muscle: "Espalda",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Párate con los pies separados al ancho de los hombros y una barra apoyada en la parte superior de la espalda. 2. Manteniendo la espalda recta, inclínate hacia adelante desde la cintura hasta que tu torso esté paralelo al suelo. 3. Vuelve lentamente a la posición inicial."
},
{
    name: "Rack Pulls",
    description: "Similar al peso muerto, pero con un rango de movimiento más corto, comenzando con la barra a la altura de las rodillas.",
    sets: 3,
    reps: 6,
    weight: null, // El usuario ingresará el peso
    muscle: "Espalda",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Coloca una barra en un rack de potencia a la altura de las rodillas. 2. Párate frente a la barra con los pies separados al ancho de las caderas. 3. Agáchate y agarra la barra con las manos un poco más anchas que el ancho de los hombros. 4. Manteniendo la espalda recta, levanta la barra, extendiendo las piernas y la espalda al mismo tiempo. 5. Baja la barra lentamente hasta la posición inicial."
},
{
    name: "Remo Invertido",
    description: "Un ejercicio de peso corporal que trabaja los músculos de la espalda y los bíceps.",
    sets: 3,
    reps: 10,
    weight: "Peso corporal",
    muscle: "Espalda",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Coloca una barra en un rack de potencia a la altura de la cintura. 2. Acuéstate debajo de la barra y agárrala con las manos un poco más anchas que el ancho de los hombros. 3. Manteniendo el cuerpo recto, tira de tu pecho hacia la barra. 4. Baja lentamente hasta la posición inicial."
},
{
    name: "Pull-Over con Barra",
    description: "Este ejercicio trabaja tanto el pecho como la espalda, ayudando a expandir la caja torácica y mejorar la postura.",
    sets: 3,
    reps: 12,
    weight: null,
    muscle: "Espalda",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Acuéstate en un banco plano con la cabeza en el extremo. 2. Sostén una barra con las manos a la anchura de los hombros. 3. Con los brazos ligeramente doblados, baja la barra por detrás de la cabeza en un arco. 4. Levanta la barra hasta la posición inicial, contrayendo los dorsales."
},
{
    name: "Remo con Barra T",
    description: "Una variante del remo con barra que se realiza con una barra T, enfocándose en la espalda media.",
    sets: 3,
    reps: 10,
    weight: null,
    muscle: "Espalda",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Colócate sobre una barra T con los pies firmes. 2. Inclínate hacia adelante y agarra las asas de la barra. 3. Manteniendo la espalda recta, tira de la barra hacia el pecho. 4. Baja la barra de forma controlada a la posición inicial."
},
{
    name: "Jalón al Pecho con Agarre Estrecho",
    description: "Similar al jalón al pecho, pero con un agarre más estrecho para un mayor énfasis en los bíceps y la espalda media.",
    sets: 3,
    reps: 10,
    weight: null,
    muscle: "Espalda",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Siéntate en una máquina de jalón al pecho con el asiento ajustado. 2. Agarra la barra con un agarre estrecho, palmas hacia ti. 3. Tira de la barra hacia el pecho, manteniendo la espalda recta. 4. Retorna a la posición inicial de forma controlada."
},
{
    name: "Remo en Máquina",
    description: "Ejercicio realizado en una máquina de remo, ideal para aislar los músculos de la espalda.",
    sets: 3,
    reps: 10,
    weight: null,
    muscle: "Espalda",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Siéntate en la máquina de remo con el pecho apoyado en la almohadilla. 2. Agarra las asas y tira hacia atrás, contrayendo los músculos de la espalda. 3. Mantén la espalda recta y el movimiento controlado. 4. Retorna a la posición inicial lentamente."
},
{
    name: "Natación (Superman)",
    description: "Ejercicio de peso corporal que fortalece la espalda baja, glúteos y hombros.",
    sets: 3,
    reps: 15,
    weight: "Peso corporal",
    muscle: "Espalda",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Acuéstate boca abajo con los brazos y piernas extendidos. 2. Levanta simultáneamente los brazos y piernas del suelo, como si estuvieras volando. 3. Mantén la posición por un segundo, contrayendo la espalda baja. 4. Baja los brazos y piernas de forma controlada."
},

    // Hombros
    {
        name: "Press Militar con Barra",
        description: "Ejercicio fundamental para los hombros, trabajando principalmente el deltoides frontal y medio, con una barra levantada por encima de la cabeza.",
        sets: 3,
        reps: 8,
        weight: null, // El usuario ingresará el peso
        muscle: "Hombros",
        stars: 5,
        dropset: false,
        restpause: false,
        howToDo: "1. De pie, sostén una barra a la altura de los hombros con un agarre prono. 2. Levanta la barra por encima de la cabeza hasta que los brazos estén completamente extendidos. 3. Baja la barra de forma controlada hasta la posición inicial."
    },
    {
        name: "Press Arnold",
        description: "Variante del press con mancuernas que involucra una rotación de muñeca, aumentando la activación del deltoides.",
        sets: 3,
        reps: 10,
        weight: null, // El usuario ingresará el peso
        muscle: "Hombros",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Siéntate en un banco con respaldo, sosteniendo mancuernas a la altura de los hombros. 2. Comienza con las palmas mirando hacia ti. 3. Levanta las mancuernas mientras rotas las muñecas hacia afuera. 4. Termina con las palmas mirando hacia adelante y los brazos extendidos. 5. Invierte el movimiento para volver a la posición inicial."
    },
    {
        name: "Elevaciones Laterales con Mancuernas",
        description: "Ejercicio de aislamiento para el deltoides lateral, realizado levantando mancuernas hacia los lados.",
        sets: 3,
        reps: 12,
        weight: null, // El usuario ingresará el peso
        muscle: "Hombros",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. De pie, sostén una mancuerna en cada mano a los lados. 2. Con una ligera flexión en los codos, levanta las mancuernas hacia los lados hasta que estén a la altura de los hombros. 3. Baja las mancuernas de forma controlada."
    },
    {
        name: "Elevaciones Frontales con Mancuernas",
        description: "Ejercicio de aislamiento para el deltoides frontal, realizado levantando mancuernas hacia adelante.",
        sets: 3,
        reps: 12,
        weight: null, // El usuario ingresará el peso
        muscle: "Hombros",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. De pie, sostén una mancuerna en cada mano frente a los muslos. 2. Levanta las mancuernas hacia adelante hasta que estén a la altura de los hombros, manteniendo los codos ligeramente flexionados. 3. Baja las mancuernas de forma controlada."
    },
    {
        name: "Pájaros con Mancuernas",
        description: "Ejercicio para el deltoides posterior, realizado inclinándose hacia adelante y levantando mancuernas hacia los lados.",
        sets: 3,
        reps: 12,
        weight: null, // El usuario ingresará el peso
        muscle: "Hombros",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Inclínate hacia adelante desde la cintura, manteniendo la espalda recta. 2. Sostén una mancuerna en cada mano, colgando hacia abajo. 3. Levanta las mancuernas hacia los lados, manteniendo una ligera flexión en los codos. 4. Baja las mancuernas de forma controlada."
    },
    {
        name: "Remo al Mentón con Barra",
        description: "Ejercicio compuesto que trabaja los deltoides y el trapecio superior, tirando de una barra hacia el mentón.",
        sets: 3,
        reps: 10,
        weight: null, // El usuario ingresará el peso
        muscle: "Hombros",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. De pie, agarra una barra con un agarre estrecho, las palmas hacia ti. 2. Tira de la barra hacia arriba, hacia el mentón, manteniendo los codos por encima de las manos. 3. Baja la barra de forma controlada."
    },
    {
        name: "Face Pulls",
        description: "Ejercicio con polea que trabaja el deltoides posterior y los músculos de la espalda alta, mejorando la postura.",
        sets: 3,
        reps: 15,
        weight: null, // El usuario ingresará el peso
        muscle: "Hombros",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Ajusta una polea a la altura de la cara y coloca una cuerda. 2. Agarra los extremos de la cuerda con las palmas enfrentadas. 3. Tira de la cuerda hacia la cara, separando las manos a medida que se acercan. 4. Aprieta los músculos de la espalda alta. 5. Vuelve lentamente a la posición inicial."
    },
    {
        name: "Press con Mancuernas Sentado",
        description: "Variante del press militar, realizado sentado con mancuernas para mayor estabilidad y enfoque en los deltoides.",
        sets: 3,
        reps: 10,
        weight: null, // El usuario ingresará el peso
        muscle: "Hombros",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Siéntate en un banco con respaldo, sosteniendo una mancuerna en cada mano a la altura de los hombros. 2. Empuja las mancuernas hacia arriba hasta que los brazos estén completamente extendidos. 3. Baja las mancuernas de forma controlada hasta la posición inicial."
    },
    {
        name: "Elevaciones Laterales en Máquina",
        description: "Ejercicio de aislamiento para el deltoides lateral, realizado en una máquina específica para un movimiento controlado.",
        sets: 3,
        reps: 12,
        weight: null, // El usuario ingresará el peso
        muscle: "Hombros",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Siéntate en la máquina de elevaciones laterales con los brazos a los lados, los codos ligeramente flexionados. 2. Levanta los brazos hacia los lados hasta que estén paralelos al suelo. 3. Baja los brazos de forma controlada."
    },
    {
        name: "Elevaciones Frontales con Barra",
        description: "Ejercicio de aislamiento para el deltoides frontal, utilizando una barra para un agarre diferente.",
        sets: 3,
        reps: 12,
        weight: null, // El usuario ingresará el peso
        muscle: "Hombros",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. De pie, sostén una barra frente a los muslos con un agarre prono. 2. Levanta la barra hacia adelante hasta que esté a la altura de los hombros, manteniendo los codos ligeramente flexionados. 3. Baja la barra de forma controlada."
    },
    {
        name: "Pájaros Invertido en Máquina",
        description: "Ejercicio para el deltoides posterior, realizado en una máquina específica para un movimiento controlado.",
        sets: 3,
        reps: 12,
        weight: null, // El usuario ingresará el peso
        muscle: "Hombros",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Siéntate en la máquina de pájaros invertido con el pecho contra la almohadilla. 2. Agarra las asas y extiende los brazos hacia los lados, contrayendo los deltoides posteriores. 3. Vuelve lentamente a la posición inicial."
    },
    {
        name: "Remo al Mentón con Mancuernas",
        description: "Similar al remo al mentón con barra, pero usando mancuernas, lo que permite un mayor rango de movimiento.",
        sets: 3,
        reps: 10,
        weight: null, // El usuario ingresará el peso
        muscle: "Hombros",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. De pie, sostén una mancuerna en cada mano frente a ti. 2. Tira de las mancuernas hacia arriba, hacia el mentón, manteniendo los codos por encima de las manos. 3. Baja las mancuernas de forma controlada."
    },
    {
        name: "Press de Hombros en Máquina",
        description: "Ejercicio de press realizado en una máquina, proporcionando estabilidad y un movimiento guiado.",
        sets: 3,
        reps: 10,
        weight: null, // El usuario ingresará el peso
        muscle: "Hombros",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Siéntate en la máquina de press de hombros con la espalda apoyada. 2. Agarra las asas y empuja hacia arriba hasta que los brazos estén extendidos. 3. Baja el peso de forma controlada."
    },
    {
        name: "Encogimientos de Hombros con Barra",
        description: "Ejercicio para el trapecio superior, realizado sosteniendo una barra y encogiendo los hombros hacia las orejas.",
        sets: 3,
        reps: 12,
        weight: null, // El usuario ingresará el peso
        muscle: "Hombros",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. De pie, sostén una barra frente a los muslos con un agarre prono. 2. Encoge los hombros hacia las orejas, manteniendo los brazos extendidos. 3. Baja los hombros de forma controlada."
    },
    {
        name: "Encogimientos de Hombros con Mancuernas",
        description: "Similar a los encogimientos con barra, pero con mancuernas, permitiendo un movimiento más natural.",
        sets: 3,
        reps: 12,
        weight: null, // El usuario ingresará el peso
        muscle: "Hombros",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. De pie, sostén una mancuerna en cada mano a los lados. 2. Encoge los hombros hacia las orejas, manteniendo los brazos extendidos. 3. Baja los hombros de forma controlada."
    },
     // Bíceps
     {
        name: "Curl con Barra",
        description: "Ejercicio clásico para bíceps, realizado de pie con una barra, trabajando ambas cabezas del bíceps.",
        sets: 3,
        reps: 10,
        weight: null, // El usuario ingresará el peso
        muscle: "Bíceps",
        stars: 5,
        dropset: false,
        restpause: false,
        howToDo: "1. De pie, agarra una barra con un agarre supino, manos al ancho de los hombros. 2. Mantén los codos pegados al cuerpo. 3. Flexiona los codos para levantar la barra hacia los hombros. 4. Baja la barra lentamente a la posición inicial."
    },
    {
        name: "Curl con Mancuernas",
        description: "Similar al curl con barra, pero con mancuernas, permitiendo un trabajo más equilibrado de cada bíceps.",
        sets: 3,
        reps: 10,
        weight: null, // El usuario ingresará el peso
        muscle: "Bíceps",
        stars: 5,
        dropset: false,
        restpause: false,
        howToDo: "1. De pie, sostén una mancuerna en cada mano con las palmas hacia adelante. 2. Flexiona los codos para levantar las mancuernas hacia los hombros. 3. Mantén los codos pegados al cuerpo. 4. Baja las mancuernas lentamente a la posición inicial."
    },
    {
        name: "Curl Martillo",
        description: "Variante del curl con mancuernas que trabaja el braquial anterior, además del bíceps, con un agarre neutro.",
        sets: 3,
        reps: 12,
        weight: null, // El usuario ingresará el peso
        muscle: "Bíceps",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. De pie, sostén una mancuerna en cada mano con las palmas enfrentadas. 2. Flexiona los codos para levantar las mancuernas hacia los hombros. 3. Mantén los codos pegados al cuerpo y las palmas enfrentadas durante todo el movimiento. 4. Baja las mancuernas lentamente a la posición inicial."
    },
    {
        name: "Curl Concentrado",
        description: "Ejercicio de aislamiento para el bíceps, realizado sentado y apoyando el codo en el muslo para maximizar la contracción.",
        sets: 3,
        reps: 12,
        weight: null, // El usuario ingresará el peso
        muscle: "Bíceps",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Siéntate en un banco con una mancuerna en una mano. 2. Apoya el codo en la cara interna del muslo. 3. Flexiona el codo para levantar la mancuerna hacia el hombro. 4. Aprieta el bíceps en la parte superior del movimiento. 5. Baja la mancuerna lentamente a la posición inicial."
    },
    {
        name: "Curl en Banco Scott (Predicador)",
        description: "Ejercicio de aislamiento para el bíceps, realizado en un banco Scott para evitar trampas y maximizar la tensión en el bíceps.",
        sets: 3,
        reps: 10,
        weight: null, // El usuario ingresará el peso
        muscle: "Bíceps",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Siéntate en un banco Scott con una barra o mancuernas. 2. Apoya la parte posterior de los brazos en la almohadilla. 3. Flexiona los codos para levantar el peso hacia los hombros. 4. Mantén los brazos en contacto con la almohadilla durante todo el movimiento. 5. Baja el peso lentamente a la posición inicial."
    },
    {
        name: "Curl de Bíceps en Polea Baja",
        description: "Ejercicio con polea que permite un rango de movimiento completo y una tensión constante en el bíceps.",
        sets: 3,
        reps: 12,
        weight: null, // El usuario ingresará el peso
        muscle: "Bíceps",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Coloca una polea en la posición baja y agarra el mango con una mano. 2. Manteniendo el codo pegado al cuerpo, flexiona el codo para levantar el mango hacia el hombro. 3. Aprieta el bíceps en la parte superior del movimiento. 4. Baja el mango lentamente a la posición inicial."
    },
    {
        name: "Curl con Barra Z",
        description: "Similar al curl con barra, pero utilizando una barra Z que reduce la tensión en las muñecas.",
        sets: 3,
        reps: 10,
        weight: null, // El usuario ingresará el peso
        muscle: "Bíceps",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. De pie, agarra una barra Z con un agarre supino, manos al ancho de los hombros. 2. Mantén los codos pegados al cuerpo. 3. Flexiona los codos para levantar la barra hacia los hombros. 4. Baja la barra lentamente a la posición inicial."
    },
    {
        name: "Dominadas Supinas",
        description: "Variante de las dominadas con agarre supino, que pone mayor énfasis en los bíceps.",
        sets: 3,
        reps: 8,
        weight: "Peso corporal",
        muscle: "Bíceps",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Agarra una barra de dominadas con un agarre supino, manos al ancho de los hombros. 2. Cuélgate de la barra con los brazos extendidos. 3. Tira de tu cuerpo hacia arriba hasta que tu barbilla esté por encima de la barra. 4. Baja lentamente a la posición inicial."
    },
    {
        name: "Curl Invertido con Barra",
        description: "Trabaja los músculos del antebrazo y el braquial anterior, además del bíceps, utilizando un agarre prono.",
        sets: 3,
        reps: 10,
        weight: null,
        muscle: "Bíceps",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. De pie, agarra una barra con un agarre prono, manos al ancho de los hombros. 2. Mantén los codos pegados al cuerpo. 3. Flexiona los codos para levantar la barra hacia los hombros. 4. Baja la barra lentamente a la posición inicial."
    },
    {
        name: "Curl de Bíceps con Banda de Resistencia",
        description: "Ejercicio versátil que utiliza una banda de resistencia para proporcionar una tensión constante en el bíceps durante todo el movimiento.",
        sets: 3,
        reps: 12,
        weight: null,
        muscle: "Bíceps",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Pisa una banda de resistencia y agarra los extremos con las manos. 2. Mantén los codos pegados al cuerpo. 3. Flexiona los codos para levantar las manos hacia los hombros, estirando la banda. 4. Baja las manos lentamente a la posición inicial."
    },
    {
        name: "Curl Araña",
        description: "Una variante del curl que se realiza boca abajo en un banco inclinado, enfocándose en la cabeza corta del bíceps.",
        sets: 3,
        reps: 10,
        weight: null,
        muscle: "Bíceps",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Acuéstate boca abajo en un banco inclinado con una mancuerna en cada mano. 2. Deja que los brazos cuelguen hacia abajo. 3. Flexiona los codos para levantar las mancuernas hacia los hombros. 4. Baja las mancuernas lentamente a la posición inicial."
    },
    {
        name: "Curl de Concentración con Polea",
        description: "Similar al curl concentrado, pero realizado con una polea baja para una tensión constante.",
        sets: 3,
        reps: 12,
        weight: null,
        muscle: "Bíceps",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Siéntate en un banco con una polea baja a un lado. 2. Agarra el mango con una mano y apoya el codo en la cara interna del muslo. 3. Flexiona el codo para levantar el mango hacia el hombro. 4. Aprieta el bíceps en la parte superior del movimiento. 5. Baja el mango lentamente a la posición inicial."
    },
    {
        name: "Curl de Bíceps en Máquina",
        description: "Ejercicio realizado en una máquina específica de curl de bíceps, que proporciona un movimiento guiado y controlado.",
        sets: 3,
        reps: 10,
        weight: null,
        muscle: "Bíceps",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Siéntate en la máquina de curl de bíceps y ajusta el asiento. 2. Agarra las asas con un agarre supino. 3. Flexiona los codos para levantar las asas hacia los hombros. 4. Baja las asas lentamente a la posición inicial."
    },
    {
        name: "Curl con Mancuerna Inclinado",
        description: "Realizado en un banco inclinado, este ejercicio pone mayor énfasis en la cabeza larga del bíceps.",
        sets: 3,
        reps: 10,
        weight: null,
        muscle: "Bíceps",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Siéntate en un banco inclinado con una mancuerna en cada mano. 2. Deja que los brazos cuelguen hacia abajo. 3. Flexiona los codos para levantar las mancuernas hacia los hombros. 4. Baja las mancuernas lentamente a la posición inicial."
    },
    {
        name: "Curl 21",
        description: "Un ejercicio avanzado que combina tres rangos de movimiento diferentes en una sola serie para un trabajo intenso del bíceps.",
        sets: 3,
        reps: 21, // 7 repeticiones en cada rango de movimiento
        weight: null,
        muscle: "Bíceps",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Realiza 7 repeticiones de curl con barra desde la posición inicial hasta la mitad del movimiento. 2. Luego, realiza 7 repeticiones desde la mitad del movimiento hasta la parte superior. 3. Finalmente, realiza 7 repeticiones completas. Todo esto cuenta como una serie."
    },
        // Tríceps
        {
            name: "Press Francés con Barra",
            description: "Acostado en un banco, este ejercicio aísla los tríceps, extendiendo una barra desde la frente hasta la extensión completa del brazo.",
            sets: 3,
            reps: 10,
            weight: null, // El usuario ingresará el peso
            muscle: "Tríceps",
            stars: 5,
            dropset: false,
            restpause: false,
            howToDo: "1. Acuéstate en un banco plano con una barra cargada. 2. Agarra la barra con un agarre estrecho, manos a la anchura de los hombros. 3. Baja la barra hacia la frente, manteniendo los codos fijos. 4. Extiende los brazos para levantar la barra, contrayendo los tríceps."
        },
        {
            name: "Press Francés con Mancuernas",
            description: "Similar al press francés con barra, pero usando mancuernas, lo que permite un mayor rango de movimiento y trabajo individual de cada brazo.",
            sets: 3,
            reps: 10,
            weight: null, // El usuario ingresará el peso
            muscle: "Tríceps",
            stars: 4,
            dropset: false,
            restpause: false,
            howToDo: "1. Acuéstate en un banco plano con una mancuerna en cada mano. 2. Extiende los brazos hacia arriba, con las palmas enfrentadas. 3. Baja las mancuernas hacia la cabeza, doblando los codos. 4. Extiende los brazos para volver a la posición inicial, enfocándote en los tríceps."
        },
        {
            name: "Extensiones de Tríceps en Polea Alta",
            description: "De pie frente a una polea alta, este ejercicio trabaja las tres cabezas del tríceps con un movimiento de extensión.",
            sets: 3,
            reps: 12,
            weight: null, // El usuario ingresará el peso
            muscle: "Tríceps",
            stars: 4,
            dropset: false,
            restpause: false,
            howToDo: "1. Ajusta una polea a la altura de la cabeza y coloca una barra o cuerda. 2. Agarra la barra con un agarre prono. 3. Manteniendo los codos pegados al cuerpo, extiende los brazos hacia abajo. 4. Contrae los tríceps en la parte inferior del movimiento. 5. Vuelve lentamente a la posición inicial."
        },
        {
            name: "Press de Banca con Agarre Cerrado",
            description: "Una variante del press de banca que enfatiza los tríceps, además de trabajar el pecho y los hombros, utilizando un agarre más estrecho.",
            sets: 3,
            reps: 8,
            weight: null, // El usuario ingresará el peso
            muscle: "Tríceps",
            stars: 4,
            dropset: false,
            restpause: false,
            howToDo: "1. Acuéstate en un banco plano y agarra la barra con un agarre estrecho, manos a la anchura de los hombros. 2. Baja la barra hasta el pecho, manteniendo los codos cerca del cuerpo. 3. Empuja la barra hacia arriba hasta extender completamente los brazos."
        },
        {
            name: "Patada de Tríceps",
            description: "Ejercicio de aislamiento que se enfoca en la cabeza lateral del tríceps, realizado con una mancuerna y el torso inclinado hacia adelante.",
            sets: 3,
            reps: 12,
            weight: null, // El usuario ingresará el peso
            muscle: "Tríceps",
            stars: 4,
            dropset: false,
            restpause: false,
            howToDo: "1. Apoya una mano y una rodilla en un banco, manteniendo la espalda recta. 2. Con la otra mano, sostén una mancuerna y mantén el brazo pegado al cuerpo. 3. Extiende el antebrazo hacia atrás hasta que el brazo esté recto. 4. Baja la mancuerna de forma controlada."
        },
        {
            name: "Dips de Tríceps en Banco",
            description: "Ejercicio de peso corporal que se puede realizar entre dos bancos, enfocándose en los tríceps y el pecho.",
            sets: 3,
            reps: 10,
            weight: "Peso corporal",
            muscle: "Tríceps",
            stars: 4,
            dropset: false,
            restpause: false,
            howToDo: "1. Coloca las manos en un banco detrás de ti, con los dedos apuntando hacia adelante. 2. Coloca los pies en otro banco o en el suelo. 3. Baja el cuerpo doblando los codos hasta que formen un ángulo de 90 grados. 4. Empuja hacia arriba hasta la posición inicial, extendiendo los brazos."
        },
        {
            name: "Extensiones de Tríceps Acostado con Mancuernas",
            description: "Similar al press francés, pero realizado con mancuernas y con un enfoque en la extensión completa del tríceps.",
            sets: 3,
            reps: 12,
            weight: null, // El usuario ingresará el peso
            muscle: "Tríceps",
            stars: 4,
            dropset: false,
            restpause: false,
            howToDo: "1. Acuéstate en un banco plano con una mancuerna en cada mano. 2. Extiende los brazos hacia arriba, con las palmas enfrentadas. 3. Baja las mancuernas hacia la cabeza, doblando solo los codos. 4. Extiende los brazos para volver a la posición inicial, contrayendo los tríceps."
        },
        {
            name: "Rompecráneos (Skullcrushers)",
            description: "Una variante del press francés que se realiza acostado, bajando una barra o mancuernas hacia la frente.",
            sets: 3,
            reps: 10,
            weight: null, // El usuario ingresará el peso
            muscle: "Tríceps",
            stars: 4,
            dropset: false,
            restpause: false,
            howToDo: "1. Acuéstate en un banco plano con una barra o mancuernas. 2. Sostén el peso por encima de la frente con los brazos extendidos. 3. Baja el peso hacia la frente, doblando los codos. 4. Extiende los brazos para volver a la posición inicial, enfocándote en los tríceps."
        },
        {
            name: "Press Francés con Barra Z",
            description: "Similar al press francés con barra, pero utilizando una barra Z para reducir la tensión en las muñecas.",
            sets: 3,
            reps: 10,
            weight: null, // El usuario ingresará el peso
            muscle: "Tríceps",
            stars: 4,
            dropset: false,
            restpause: false,
            howToDo: "1. Acuéstate en un banco plano y agarra una barra Z con un agarre estrecho. 2. Baja la barra hacia la frente, manteniendo los codos fijos. 3. Extiende los brazos para levantar la barra, contrayendo los tríceps."
        },
        {
            name: "Extensiones de Tríceps con Soga en Polea Alta",
            description: "Utiliza una cuerda en polea alta para trabajar los tríceps con un agarre diferente, enfatizando la cabeza larga del tríceps.",
            sets: 3,
            reps: 12,
            weight: null, // El usuario ingresará el peso
            muscle: "Tríceps",
            stars: 4,
            dropset: false,
            restpause: false,
            howToDo: "1. Ajusta una polea a la altura de la cabeza y coloca una cuerda. 2. Agarra los extremos de la cuerda con un agarre neutro. 3. Manteniendo los codos pegados al cuerpo, extiende los brazos hacia abajo. 4. Contrae los tríceps en la parte inferior del movimiento. 5. Vuelve lentamente a la posición inicial."
        },
        {
            name: "Dips en Máquina Asistida",
            description: "Una variante de los fondos en paralelas que utiliza una máquina para asistir el movimiento, ideal para principiantes o para añadir más repeticiones.",
            sets: 3,
            reps: 10,
            weight: null, // Ajustar la asistencia según sea necesario
            muscle: "Tríceps",
            stars: 4,
            dropset: false,
            restpause: false,
            howToDo: "1. Ajusta la máquina de dips asistidos según tu nivel de fuerza. 2. Colócate en la máquina con las manos en las barras. 3. Baja el cuerpo doblando los codos, manteniendo el torso erguido. 4. Empuja hacia arriba hasta extender los brazos, enfocándote en los tríceps."
        },
         {
            name: "Flexiones Diamante",
            description: "Una variante de las flexiones que pone mayor énfasis en los tríceps, colocando las manos juntas en forma de diamante.",
            sets: 3,
            reps: 10,
            weight: "Peso corporal",
            muscle: "Tríceps",
            stars: 4,
            dropset: false,
            restpause: false,
            howToDo: "1. Colócate en posición de flexión con las manos juntas, formando un diamante con los índices y pulgares. 2. Baja el cuerpo hasta que el pecho casi toque las manos. 3. Empuja hacia arriba hasta la posición inicial, enfocándote en los tríceps."
        },
        {
            name: "Extensión de Tríceps a una Mano con Mancuerna",
            description: "Ejercicio de aislamiento que permite trabajar cada tríceps de forma individual, mejorando el equilibrio y la definición muscular.",
            sets: 3,
            reps: 12,
            weight: null, // El usuario ingresará el peso
            muscle: "Tríceps",
            stars: 4,
            dropset: false,
            restpause: false,
            howToDo: "1. Siéntate o párate sosteniendo una mancuerna con una mano. 2. Extiende el brazo por encima de la cabeza. 3. Baja la mancuerna por detrás de la cabeza, doblando el codo. 4. Extiende el brazo para volver a la posición inicial, enfocándote en el tríceps."
        },
        {
            name: "Press Francés Inclinado con Mancuernas",
            description: "Realizado en un banco inclinado, este ejercicio con mancuernas ayuda a enfocar el trabajo en la cabeza larga del tríceps.",
            sets: 3,
            reps: 10,
            weight: null, // El usuario ingresará el peso
            muscle: "Tríceps",
            stars: 4,
            dropset: false,
            restpause: false,
            howToDo: "1. Ajusta un banco a una inclinación de 30-45 grados. 2. Acuéstate en el banco con una mancuerna en cada mano. 3. Extiende los brazos hacia arriba. 4. Baja las mancuernas hacia la cabeza, doblando los codos. 5. Extiende los brazos para volver a la posición inicial, contrayendo los tríceps."
        },
        {
            name: "Extensión de Tríceps Sentado con Mancuerna",
            description: "Este ejercicio se realiza sentado, con una o dos mancuernas, y se enfoca en la extensión del tríceps por encima de la cabeza.",
            sets: 3,
            reps: 10,
            weight: null, // El usuario ingresará el peso
            muscle: "Tríceps",
            stars: 4,
            dropset: false,
            restpause: false,
            howToDo: "1. Siéntate en un banco con una mancuerna en ambas manos o una en cada mano. 2. Extiende los brazos por encima de la cabeza. 3. Baja las mancuernas por detrás de la cabeza, doblando los codos. 4. Extiende los brazos para volver a la posición inicial, enfocándote en los tríceps."
        },
         // Abdominales
    {
        name: "Crunches",
        description: "Ejercicio clásico para abdominales que se enfoca en el recto abdominal.",
        sets: 3,
        reps: 15,
        weight: "Peso corporal",
        muscle: "Abdominales",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Acuéstate boca arriba con las rodillas flexionadas y los pies apoyados en el suelo. 2. Coloca las manos detrás de la cabeza o cruzadas sobre el pecho. 3. Levanta la cabeza y los hombros del suelo, contrayendo los abdominales. 4. Baja lentamente a la posición inicial."
    },
    {
        name: "Plancha",
        description: "Ejercicio isométrico que fortalece el core, incluyendo los abdominales, la espalda y los músculos estabilizadores.",
        sets: 3,
        reps: 30, // Segundos
        time: 30,
        weight: "Peso corporal",
        muscle: "Abdominales",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Colócate en posición de flexión, apoyándote en los antebrazos y las puntas de los pies. 2. Mantén el cuerpo recto, desde la cabeza hasta los talones. 3. Contrae los abdominales y mantén la posición durante el tiempo deseado."
    },
    {
        name: "Elevaciones de Piernas",
        description: "Ejercicio que trabaja los abdominales inferiores y los flexores de la cadera.",
        sets: 3,
        reps: 15,
        weight: "Peso corporal",
        muscle: "Abdominales",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Acuéstate boca arriba con las manos a los lados o debajo de los glúteos. 2. Levanta las piernas rectas hacia el techo, manteniendo la espalda baja en el suelo. 3. Baja las piernas lentamente sin que toquen el suelo. 4. Repite el movimiento."
    },
    {
        name: "Bicicleta Abdominal",
        description: "Ejercicio dinámico para los abdominales que también involucra los oblicuos.",
        sets: 3,
        reps: 20,
        weight: "Peso corporal",
        muscle: "Abdominales",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Acuéstate boca arriba con las manos detrás de la cabeza. 2. Levanta las piernas y flexiona una rodilla hacia el pecho mientras giras el codo opuesto hacia ella. 3. Alterna los lados en un movimiento de pedaleo."
    },
    {
        name: "Toques al Talón",
        description: "Ejercicio que se enfoca en los oblicuos y el recto abdominal.",
        sets: 3,
        reps: 20,
        weight: "Peso corporal",
        muscle: "Abdominales",
        stars: 3,
        dropset: false,
        restpause: false,
        howToDo: "1. Acuéstate boca arriba con las rodillas flexionadas y los pies apoyados en el suelo. 2. Extiende los brazos a los lados. 3. Levanta ligeramente la cabeza y los hombros del suelo. 4. Toca el talón derecho con la mano derecha y luego el talón izquierdo con la mano izquierda, alternando los lados."
    },
    {
        name: "Rueda Abdominal",
        description: "Ejercicio avanzado que requiere una rueda abdominal para fortalecer el core y los abdominales.",
        sets: 3,
        reps: 10,
        weight: "Peso corporal",
        muscle: "Abdominales",
        stars: 5,
        dropset: false,
        restpause: false,
        howToDo: "1. Arrodíllate en el suelo y sujeta la rueda abdominal con ambas manos. 2. Rueda hacia adelante, extendiendo el cuerpo lo más posible sin que la espalda se arquee. 3. Contrae los abdominales para volver a la posición inicial."
    },
    {
        name: "Plancha Lateral",
        description: "Ejercicio isométrico que fortalece los oblicuos y mejora la estabilidad del core.",
        sets: 3,
        reps: 30, // Segundos
        time: 30,
        weight: "Peso corporal",
        muscle: "Abdominales",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Apóyate en un antebrazo y el lateral del pie, manteniendo el cuerpo recto. 2. El codo debe estar directamente debajo del hombro. 3. Mantén la posición durante el tiempo deseado. 4. Cambia de lado y repite."
    },
    {
        name: "Crunches Inversos",
        description: "Ejercicio que se enfoca en los abdominales inferiores, llevando las rodillas hacia el pecho.",
        sets: 3,
        reps: 15,
        weight: "Peso corporal",
        muscle: "Abdominales",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Acuéstate boca arriba con las manos a los lados. 2. Levanta las piernas y flexiona las rodillas hacia el pecho. 3. Contrae los abdominales para levantar las caderas del suelo. 4. Baja lentamente las piernas a la posición inicial."
    },
    {
        name: "Crunches con Giro (Twist)",
        description: "Variante del crunch que incluye un giro del torso para trabajar los oblicuos.",
        sets: 3,
        reps: 15,
        weight: "Peso corporal",
        muscle: "Abdominales",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Acuéstate boca arriba con las rodillas flexionadas y las manos detrás de la cabeza. 2. Levanta la cabeza y los hombros del suelo mientras giras el torso, llevando el codo derecho hacia la rodilla izquierda. 3. Alterna los lados en cada repetición."
    },
    {
        name: "Elevaciones de Piernas Colgado",
        description: "Ejercicio avanzado que trabaja los abdominales inferiores y los flexores de la cadera, colgado de una barra.",
        sets: 3,
        reps: 10,
        weight: "Peso corporal",
        muscle: "Abdominales",
        stars: 5,
        dropset: false,
        restpause: false,
        howToDo: "1. Cuélgate de una barra con las manos al ancho de los hombros. 2. Levanta las piernas rectas hacia arriba, manteniendo el core apretado. 3. Baja las piernas lentamente. 4. Evita balancearte durante el ejercicio."
    },
    {
        name: "Plancha con Toque de Hombro",
        description: "Variante de la plancha que añade un movimiento de toque de hombro para aumentar la inestabilidad y el trabajo del core.",
        sets: 3,
        reps: 20, // Alternar toques de hombro
        weight: "Peso corporal",
        muscle: "Abdominales",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Comienza en posición de plancha alta con las manos debajo de los hombros. 2. Manteniendo el core apretado, toca el hombro derecho con la mano izquierda. 3. Vuelve a la posición inicial y repite con el otro lado. 4. Alterna los lados, manteniendo el cuerpo estable."
    },
    {
        name: "Leñadores con Polea",
        description: "Ejercicio dinámico que trabaja los oblicuos y el core, utilizando una polea para simular el movimiento de cortar leña.",
        sets: 3,
        reps: 15,
        weight: null, // El usuario ingresará el peso
        muscle: "Abdominales",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Ajusta una polea a una altura media-alta. 2. Párate de lado a la polea y agarra el mango con ambas manos. 3. Gira el torso y tira del mango hacia abajo y a través del cuerpo, como si estuvieras cortando leña. 4. Vuelve lentamente a la posición inicial. 5. Repite en el otro lado."
    },
    {
        name: "Crunches en Banco Declinado",
        description: "Variante del crunch que se realiza en un banco declinado para aumentar la intensidad y el rango de movimiento.",
        sets: 3,
        reps: 15,
        weight: "Peso corporal",
        muscle: "Abdominales",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Ajusta un banco a una posición declinada. 2. Siéntate en el banco con los pies asegurados. 3. Baja el torso hacia atrás, manteniendo la contracción en los abdominales. 4. Levanta el torso hasta que esté cerca de las rodillas. 5. Baja lentamente a la posición inicial."
    },
    {
        name: "Abdominales en V",
        description: "Ejercicio avanzado que trabaja todo el recto abdominal y los flexores de la cadera, formando una 'V' con el cuerpo.",
        sets: 3,
        reps: 10,
        weight: "Peso corporal",
        muscle: "Abdominales",
        stars: 5,
        dropset: false,
        restpause: false,
        howToDo: "1. Acuéstate boca arriba con los brazos extendidos por encima de la cabeza y las piernas rectas. 2. Simultáneamente, levanta los brazos y las piernas hacia el techo, formando una 'V' con el cuerpo. 3. Toca las puntas de los pies con las manos. 4. Baja lentamente a la posición inicial."
    },
    {
        name: "Rodillas al Pecho en Suspensión",
        description: "Ejercicio que trabaja los abdominales inferiores y los flexores de la cadera, colgado de una barra o en una máquina específica.",
        sets: 3,
        reps: 12,
        weight: "Peso corporal",
        muscle: "Abdominales",
        stars: 4,
        dropset: false,
        restpause: false,
        howToDo: "1. Cuélgate de una barra o colócate en una máquina de elevación de rodillas. 2. Levanta las rodillas hacia el pecho, contrayendo los abdominales. 3. Baja las piernas lentamente. 4. Evita balancearte durante el ejercicio."
    },
    // CUÁDRICEPS
{
    name: "Sentadilla con Barra",
    description: "Ejercicio compuesto fundamental para el desarrollo de los cuádriceps, glúteos e isquiotibiales.",
    sets: 4,
    reps: 10,
    weight: null, // El usuario ingresará el peso
    muscle: "Cuádriceps",
    stars: 5,
    dropset: false,
    restpause: false,
    howToDo: "1. Coloca la barra sobre la parte superior de la espalda, no sobre el cuello. 2. Separa los pies a la anchura de los hombros. 3. Baja en cuclillas hasta que los muslos estén paralelos al suelo. 4. Mantén la espalda recta y el pecho erguido. 5. Vuelve a la posición inicial empujando con los talones."
},
{
    name: "Prensa de Piernas",
    description: "Ejercicio de máquina que aísla los cuádriceps con menos estrés en la espalda baja que las sentadillas.",
    sets: 3,
    reps: 12,
    weight: null, // El usuario ingresará el peso
    muscle: "Cuádriceps",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Siéntate en la máquina de prensa de piernas con la espalda apoyada en el respaldo. 2. Coloca los pies en la plataforma a la anchura de los hombros. 3. Empuja la plataforma hacia arriba hasta que las piernas estén extendidas, sin bloquear las rodillas. 4. Baja lentamente la plataforma hasta que los muslos estén cerca del pecho. 5. Repite el movimiento."
},
{
    name: "Extensiones de Cuádriceps",
    description: "Ejercicio de aislamiento que se enfoca en los cuádriceps, especialmente en la parte inferior cerca de la rodilla.",
    sets: 3,
    reps: 15,
    weight: null, // El usuario ingresará el peso
    muscle: "Cuádriceps",
    stars: 3,
    dropset: true,
    restpause: false,
    howToDo: "1. Siéntate en la máquina de extensiones de cuádriceps con las rodillas dobladas y los tobillos bajo las almohadillas. 2. Extiende las piernas hacia arriba hasta que estén completamente rectas. 3. Contrae los cuádriceps en la parte superior del movimiento. 4. Baja lentamente el peso a la posición inicial. 5. Repite el movimiento."
},
{
    name: "Sentadilla Búlgara",
    description: "Ejercicio unilateral que trabaja intensamente los cuádriceps, glúteos y el equilibrio.",
    sets: 3,
    reps: 10, // Reps por pierna
    weight: null, // El usuario ingresará el peso o puede usar mancuernas
    muscle: "Cuádriceps",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Colócate frente a un banco o superficie elevada. 2. Extiende una pierna hacia atrás y apoya el empeine en el banco. 3. Baja en cuclillas con la pierna delantera hasta que el muslo esté paralelo al suelo. 4. Mantén el torso erguido y el core apretado. 5. Vuelve a la posición inicial y repite con la otra pierna."
},
{
    name: "Zancadas (Lunges)",
    description: "Ejercicio que trabaja cuádriceps, glúteos e isquiotibiales, mejorando el equilibrio y la coordinación.",
    sets: 3,
    reps: 12, // Reps por pierna
    weight: null, // El usuario ingresará el peso o puede usar mancuernas
    muscle: "Cuádriceps",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Da un paso largo hacia adelante con una pierna, doblando ambas rodillas. 2. Baja el cuerpo hasta que la rodilla trasera casi toque el suelo y el muslo delantero esté paralelo al suelo. 3. Mantén el torso erguido. 4. Empuja con el talón delantero para volver a la posición inicial. 5. Repite con la otra pierna."
},
{
    name: "Sentadilla Frontal",
    description: "Variante de la sentadilla donde la barra se coloca delante del cuerpo, sobre los hombros, enfatizando más los cuádriceps.",
    sets: 3,
    reps: 8,
    weight: null, // El usuario ingresará el peso
    muscle: "Cuádriceps",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Coloca la barra sobre la parte frontal de los hombros, sosteniéndola con un agarre limpio o cruzando los brazos. 2. Mantén los codos altos y el pecho erguido. 3. Baja en cuclillas hasta que los muslos estén paralelos al suelo. 4. Mantén la espalda recta y el core apretado. 5. Vuelve a la posición inicial, empujando con los talones."
},
{
    name: "Sentadilla Hack",
    description: "Ejercicio que se realiza en una máquina específica, aislando los cuádriceps y reduciendo la tensión en la espalda baja.",
    sets: 3,
    reps: 12,
    weight: null, // El usuario ingresará el peso
    muscle: "Cuádriceps",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Colócate en la máquina de sentadilla Hack con la espalda apoyada en el respaldo y los hombros bajo las almohadillas. 2. Coloca los pies en la plataforma a la anchura de los hombros. 3. Baja el cuerpo doblando las rodillas hasta que los muslos estén paralelos al suelo. 4. Mantén la espalda recta y el core apretado. 5. Vuelve a la posición inicial, empujando con los talones."
},
{
    name: "Pistol Squat (Sentadilla a una pierna)",
    description: "Ejercicio avanzado que requiere fuerza, equilibrio y flexibilidad, trabajando intensamente los cuádriceps de una pierna.",
    sets: 3,
    reps: 5, // Reps por pierna
    weight: "Peso corporal",
    muscle: "Cuádriceps",
    stars: 5,
    dropset: false,
    restpause: false,
    howToDo: "1. Ponte de pie sobre una pierna. 2. Extiende la otra pierna hacia adelante. 3. Baja lentamente el cuerpo doblando la rodilla de la pierna de apoyo, hasta que el glúteo casi toque el suelo. 4. Mantén el equilibrio y el core apretado. 5. Vuelve a la posición inicial, empujando con el talón. 6. Repite con la otra pierna."
},
{
    name: "Step-Ups (Subidas a un banco)",
    description: "Ejercicio unilateral que trabaja cuádriceps, glúteos y mejora el equilibrio.",
    sets: 3,
    reps: 12, // Reps por pierna
    weight: null, // El usuario ingresará el peso o puede usar mancuernas
    muscle: "Cuádriceps",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Colócate frente a un banco o superficie elevada. 2. Sube al banco con una pierna, colocando todo el pie sobre la superficie. 3. Mantén el torso erguido y el core apretado. 4. Baja lentamente con la misma pierna. 5. Repite con la otra pierna."
},
{
    name: "Wall Sit (Sentadilla en la pared)",
    description: "Ejercicio isométrico que trabaja la resistencia de los cuádriceps.",
    sets: 3,
    reps: 60, // Segundos
    weight: "Peso corporal",
    muscle: "Cuádriceps",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Apoya la espalda contra una pared, con los pies separados a la anchura de los hombros y a unos 60 cm de la pared. 2. Desliza la espalda hacia abajo por la pared hasta que los muslos estén paralelos al suelo, como si estuvieras sentado en una silla invisible. 3. Mantén la posición durante el tiempo especificado. 4. Mantén la espalda recta y el core apretado."
},
{
    name: "Sissy Squat",
    description: "Ejercicio que aísla los cuádriceps, especialmente la porción inferior cerca de la rodilla.",
    sets: 3,
    reps: 10,
    weight: "Peso corporal",
    muscle: "Cuádriceps",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Ponte de pie con los pies juntos y agárrate a un soporte estable para mantener el equilibrio. 2. Inclínate hacia atrás desde las rodillas, manteniendo el cuerpo recto desde las rodillas hasta la cabeza. 3. Baja el cuerpo lo más que puedas, manteniendo la tensión en los cuádriceps. 4. Vuelve a la posición inicial, utilizando solo la fuerza de los cuádriceps."
},
{
    name: "Zancadas caminando",
    description: "Variante de las zancadas donde se avanza con cada repetición, aumentando el trabajo cardiovascular.",
    sets: 3,
    reps: 20, // Pasos en total
    weight: null, // El usuario ingresará el peso o puede usar mancuernas
    muscle: "Cuádriceps",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Da un paso largo hacia adelante con una pierna, doblando ambas rodillas. 2. Baja el cuerpo hasta que la rodilla trasera casi toque el suelo y el muslo delantero esté paralelo al suelo. 3. En lugar de volver a la posición inicial, da un paso adelante con la pierna trasera para realizar la siguiente zancada. 4. Continúa avanzando con cada repetición."
},
{
    name: "Zancadas laterales",
    description: "Variante de las zancadas que trabaja los cuádriceps, glúteos y abductores, realizando un paso lateral en lugar de frontal.",
    sets: 3,
    reps: 12, // Reps por pierna
    weight: null, // El usuario ingresará el peso o puede usar mancuernas
    muscle: "Cuádriceps",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Párate con los pies juntos. 2. Da un paso amplio hacia un lado con una pierna, doblando la rodilla y manteniendo la otra pierna recta. 3. Baja el cuerpo hasta que el muslo de la pierna doblada esté paralelo al suelo. 4. Mantén el torso erguido y el core apretado. 5. Empuja con el talón para volver a la posición inicial. 6. Repite con la otra pierna."
},
{
    name: "Salto al cajón",
    description: "Ejercicio pliométrico que trabaja la potencia y explosividad de los cuádriceps, glúteos e isquiotibiales.",
    sets: 3,
    reps: 8,
    weight: "Peso corporal",
    muscle: "Cuádriceps",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Colócate frente a un cajón o superficie elevada y estable. 2. Ponte en posición de media sentadilla. 3. Salta explosivamente hacia arriba, aterrizando suavemente sobre el cajón con ambos pies. 4. Baja del cajón con cuidado. 5. Repite el movimiento."
},
{
    name: "Sentadilla con salto",
    description: "Variante de la sentadilla que añade un salto vertical, trabajando la potencia y explosividad de los cuádriceps.",
    sets: 3,
    reps: 8,
    weight: "Peso corporal",
    muscle: "Cuádriceps",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Realiza una sentadilla normal. 2. Al subir, en lugar de volver a la posición inicial de pie, salta explosivamente hacia arriba. 3. Aterriza suavemente en posición de sentadilla. 4. Repite el movimiento."
},

// ISQUIOTIBIALES
{
    name: "Peso Muerto Rumano",
    description: "Ejercicio que se enfoca en los isquiotibiales y glúteos, con menos énfasis en la espalda baja que el peso muerto convencional.",
    sets: 3,
    reps: 10,
    weight: null, // El usuario ingresará el peso
    muscle: "Isquiotibiales",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Sostén una barra o mancuernas delante de los muslos con un agarre prono. 2. Mantén la espalda recta y las rodillas ligeramente flexionadas. 3. Inclínate hacia adelante desde las caderas, bajando el peso hacia el suelo. 4. Mantén el peso cerca de las piernas. 5. Vuelve a la posición inicial, contrayendo los isquiotibiales y glúteos."
},
{
    name: "Curl de Piernas Acostado",
    description: "Ejercicio de aislamiento que trabaja los isquiotibiales en una máquina específica.",
    sets: 3,
    reps: 12,
    weight: null, // El usuario ingresará el peso
    muscle: "Isquiotibiales",
    stars: 4,
    dropset: true,
    restpause: false,
    howToDo: "1. Acuéstate boca abajo en la máquina de curl de piernas. 2. Coloca los tobillos bajo las almohadillas. 3. Flexiona las piernas, llevando los talones hacia los glúteos. 4. Contrae los isquiotibiales en la parte superior del movimiento. 5. Baja lentamente el peso a la posición inicial. 6. Repite el movimiento."
},
{
    name: "Curl de Piernas Sentado",
    description: "Variante del curl de piernas que se realiza sentado, ofreciendo un ángulo diferente de trabajo para los isquiotibiales.",
    sets: 3,
    reps: 12,
    weight: null, // El usuario ingresará el peso
    muscle: "Isquiotibiales",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Siéntate en la máquina de curl de piernas con la espalda apoyada en el respaldo. 2. Coloca los tobillos bajo las almohadillas. 3. Flexiona las piernas, llevando los talones hacia los glúteos. 4. Contrae los isquiotibiales en la parte superior del movimiento. 5. Baja lentamente el peso a la posición inicial. 6. Repite el movimiento."
},
{
    name: "Buenos Días",
    description: "Ejercicio que trabaja los isquiotibiales, glúteos y la espalda baja, similar a una reverencia.",
    sets: 3,
    reps: 10,
    weight: null, // El usuario ingresará el peso
    muscle: "Isquiotibiales",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Coloca una barra sobre la parte superior de la espalda, como en una sentadilla. 2. Con las rodillas ligeramente flexionadas, inclínate hacia adelante desde las caderas, manteniendo la espalda recta. 3. Baja el torso hasta que esté casi paralelo al suelo. 4. Vuelve a la posición inicial, contrayendo los isquiotibiales y glúteos."
},
{
    name: "Puente de Glúteos con Barra",
    description: "Ejercicio para glúteos que también involucra los isquiotibiales. Se puede realizar con barra, discos o solo peso corporal",
    sets: 3,
    reps: 12,
    weight: null, // El usuario ingresará el peso
    muscle: "Isquiotibiales",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Siéntate en el suelo con la espalda apoyada en un banco y una barra (si se usa) sobre las caderas. 2. Dobla las rodillas y apoya los pies en el suelo. 3. Levanta las caderas del suelo, empujando con los talones, hasta que el cuerpo forme una línea recta desde los hombros hasta las rodillas. 4. Aprieta los glúteos en la parte superior. 5. Baja lentamente las caderas a la posición inicial."
},
{
    name: "Peso Muerto con Piernas Rígidas",
    description: "Variante del peso muerto que enfatiza los isquiotibiales y glúteos, manteniendo las piernas casi completamente rectas.",
    sets: 3,
    reps: 10,
    weight: null, // El usuario ingresará el peso
    muscle: "Isquiotibiales",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Sostén una barra o mancuernas delante de los muslos con un agarre prono. 2. Mantén las piernas rectas o con una flexión mínima de las rodillas. 3. Inclínate hacia adelante desde las caderas, bajando el peso hacia el suelo. 4. Mantén la espalda recta y el peso cerca de las piernas. 5. Vuelve a la posición inicial, contrayendo los isquiotibiales y glúteos."
},
{
    name: "Hiperextensiones Inversas",
    description: "Ejercicio que trabaja los isquiotibiales, glúteos y la espalda baja, utilizando una máquina específica o un banco de hiperextensiones.",
    sets: 3,
    reps: 12,
    weight: "Peso corporal",
    muscle: "Isquiotibiales",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Acuéstate boca abajo en una máquina de hiperextensiones inversas o en un banco, con las caderas en el borde del banco y las piernas colgando. 2. Sujeta las asas o la parte superior del banco. 3. Levanta las piernas hacia arriba, contrayendo los isquiotibiales y glúteos, hasta que el cuerpo forme una línea recta. 4. Baja lentamente las piernas a la posición inicial. 5. Repite el movimiento."
},
{
    name: "Curl Nórdico de Isquiotibiales",
    description: "Ejercicio avanzado que trabaja intensamente los isquiotibiales, utilizando el peso corporal como resistencia.",
    sets: 3,
    reps: 6, // Es un ejercicio muy exigente
    weight: "Peso corporal",
    muscle: "Isquiotibiales",
    stars: 5,
    dropset: false,
    restpause: false,
    howToDo: "1. Arrodíllate en el suelo con un compañero sujetando tus tobillos o con los pies enganchados bajo un soporte estable. 2. Mantén el cuerpo recto desde las rodillas hasta la cabeza. 3. Baja lentamente el torso hacia adelante, utilizando solo la fuerza de los isquiotibiales para controlar el movimiento. 4. Baja lo más que puedas de forma controlada. 5. Utiliza las manos para ayudarte a volver a la posición inicial si es necesario. 6. Repite el movimiento."
},
{
    name: "Curl de Isquiotibiales con Balón Suizo (Fitball)",
    description: "Ejercicio que trabaja los isquiotibiales y el core, utilizando un balón suizo para añadir inestabilidad.",
    sets: 3,
    reps: 12,
    weight: "Peso corporal",
    muscle: "Isquiotibiales",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Acuéstate boca arriba con los talones apoyados sobre un balón suizo. 2. Levanta las caderas del suelo, formando una línea recta desde los hombros hasta los talones. 3. Flexiona las rodillas, llevando los talones hacia los glúteos y haciendo rodar el balón hacia el cuerpo. 4. Contrae los isquiotibiales en la parte superior del movimiento. 5. Extiende lentamente las piernas, haciendo rodar el balón de vuelta a la posición inicial. 6. Repite el movimiento."
},
{
    name: "Curl de Isquiotibiales con Deslizadores",
    description: "Ejercicio que utiliza deslizadores para trabajar los isquiotibiales de forma similar al curl con balón suizo, pero en una superficie plana.",
    sets: 3,
    reps: 12,
    weight: "Peso corporal",
    muscle: "Isquiotibiales",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Acuéstate boca arriba con los talones apoyados sobre deslizadores (o toallas en un suelo deslizante). 2. Levanta las caderas del suelo, formando una línea recta desde los hombros hasta los talones. 3. Flexiona las rodillas, llevando los talones hacia los glúteos y deslizando los pies hacia el cuerpo. 4. Contrae los isquiotibiales en la parte superior del movimiento. 5. Extiende lentamente las piernas, deslizando los pies de vuelta a la posición inicial. 6. Repite el movimiento."
},
{
    name: "Kettlebell Swing (Balanceo con Pesa Rusa)",
    description: "Ejercicio dinámico que trabaja los isquiotibiales, glúteos, core y la cadena posterior en general.",
    sets: 3,
    reps: 15,
    weight: null, // El usuario ingresará el peso
    muscle: "Isquiotibiales",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Párate con los pies separados a la anchura de los hombros, sosteniendo una pesa rusa con ambas manos entre las piernas. 2. Inclínate ligeramente hacia adelante desde las caderas, manteniendo la espalda recta. 3. Balancea la pesa rusa hacia atrás entre las piernas. 4. Impulsa las caderas hacia adelante con fuerza, utilizando el impulso para balancear la pesa rusa hacia arriba hasta la altura del pecho. 5. Deja que la pesa rusa vuelva a bajar entre las piernas de forma controlada. 6. Repite el movimiento de forma fluida."
},
{
    name: "Peso Muerto a una Pierna (con mancuerna o barra)",
    description: "Variante del peso muerto que trabaja intensamente los isquiotibiales y glúteos de una pierna, mejorando el equilibrio y la estabilidad.",
    sets: 3,
    reps: 10, // Reps por pierna
    weight: null, // El usuario ingresará el peso
    muscle: "Isquiotibiales",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Sostén una mancuerna o una barra en una mano. 2. Párate sobre una pierna, con la rodilla ligeramente flexionada. 3. Inclínate hacia adelante desde la cadera, bajando el peso hacia el suelo y extendiendo la pierna libre hacia atrás para mantener el equilibrio. 4. Mantén la espalda recta y el core apretado. 5. Vuelve a la posición inicial, contrayendo los isquiotibiales y glúteos de la pierna de apoyo. 6. Repite con la otra pierna."
},
{
    name: "Curl de Isquiotibiales con Banda de Resistencia",
    description: "Ejercicio que utiliza una banda de resistencia para trabajar los isquiotibiales, ideal para entrenar en casa o cuando no se dispone de máquinas.",
    sets: 3,
    reps: 15,
    weight: "Banda de resistencia",
    muscle: "Isquiotibiales",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Ata una banda de resistencia a un punto fijo y seguro a la altura del suelo. 2. Acuéstate boca abajo y coloca la banda alrededor de los tobillos. 3. Flexiona las rodillas, llevando los talones hacia los glúteos contra la resistencia de la banda. 4. Contrae los isquiotibiales en la parte superior del movimiento. 5. Baja lentamente las piernas a la posición inicial. 6. Repite el movimiento."
},
{
    name: "Glute Ham Raise (GHR)",
    description: "Ejercicio avanzado que trabaja los isquiotibiales, glúteos y erectores espinales, utilizando una máquina específica o un banco con un compañero.",
    sets: 3,
    reps: 8,
    weight: "Peso corporal",
    muscle: "Isquiotibiales",
    stars: 5,
    dropset: false,
    restpause: false,
    howToDo: "1. Colócate en una máquina de GHR o en un banco con un compañero sujetando tus tobillos. 2. Comienza con el torso erguido y perpendicular al suelo. 3. Baja lentamente el torso hacia adelante, manteniendo el cuerpo recto y utilizando la fuerza de los isquiotibiales y glúteos para controlar el movimiento. 4. Baja hasta que el torso esté paralelo al suelo o lo más que puedas. 5. Vuelve a la posición inicial, contrayendo los isquiotibiales y glúteos. 6. Repite el movimiento."
},
{
    name: "Deslizamiento de Isquiotibiales en Puente",
    description: "Variante del puente de glúteos que añade un deslizamiento para trabajar de forma más intensa los isquiotibiales.",
    sets: 3,
    reps: 12,
    weight: "Peso corporal",
    muscle: "Isquiotibiales",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Acuéstate boca arriba con las rodillas dobladas y los pies apoyados sobre deslizadores (o toallas en un suelo deslizante). 2. Levanta las caderas del suelo, formando una línea recta desde los hombros hasta las rodillas. 3. Manteniendo las caderas elevadas, desliza lentamente los pies hacia adelante, extendiendo las piernas. 4. Vuelve a la posición inicial, deslizando los pies hacia atrás y contrayendo los isquiotibiales. 5. Repite el movimiento."
},

// GLÚTEOS
{
    name: "Puente de Glúteos",
    description: "Ejercicio que aísla los glúteos y también trabaja los isquiotibiales y el core.",
    sets: 3,
    reps: 15,
    weight: "Peso corporal",
    muscle: "Glúteos",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Acuéstate boca arriba con las rodillas dobladas y los pies apoyados en el suelo. 2. Levanta las caderas del suelo hasta que el cuerpo forme una línea recta desde los hombros hasta las rodillas. 3. Aprieta los glúteos en la parte superior del movimiento. 4. Baja lentamente las caderas a la posición inicial. 5. Repite el movimiento."
},
{
    name: "Hip Thrust",
    description: "Ejercicio similar al puente de glúteos, pero con la espalda apoyada en un banco, lo que permite un mayor rango de movimiento.",
    sets: 3,
    reps: 12,
    weight: null, // El usuario ingresará el peso
    muscle: "Glúteos",
    stars: 5,
    dropset: false,
    restpause: false,
    howToDo: "1. Siéntate en el suelo con la espalda apoyada en un banco. 2. Dobla las rodillas y apoya los pies en el suelo. 3. Puedes colocar una barra o un disco sobre las caderas para añadir resistencia. 4. Levanta las caderas del suelo, empujando con los talones, hasta que el cuerpo forme una línea recta desde los hombros hasta las rodillas. 5. Aprieta los glúteos en la parte superior. 6. Baja lentamente las caderas a la posición inicial."
},
{
    name: "Patada de Glúteo",
    description: "Ejercicio que se puede realizar con el peso corporal, en una máquina o con una banda de resistencia, enfocándose en los glúteos.",
    sets: 3,
    reps: 15, // Reps por pierna
    weight: "Peso corporal o banda de resistencia",
    muscle: "Glúteos",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Ponte a cuatro patas con las manos debajo de los hombros y las rodillas debajo de las caderas. 2. Mantén una pierna doblada a 90 grados y levántala hacia atrás, como si estuvieras dando una patada hacia el techo. 3. Aprieta los glúteos en la parte superior del movimiento. 4. Baja lentamente la pierna a la posición inicial. 5. Repite con la otra pierna."
},
{
    name: "Abducción de Cadera",
    description: "Ejercicio que trabaja los glúteos, especialmente el glúteo medio, y se puede realizar acostado de lado, en una máquina o con una banda de resistencia.",
    sets: 3,
    reps: 15, // Reps por pierna
    weight: "Peso corporal o banda de resistencia",
    muscle: "Glúteos",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Acuéstate de lado con las piernas estiradas. 2. Levanta la pierna superior hacia el techo, manteniendo la pierna recta. 3. Mantén el core apretado y evita rotar la cadera. 4. Baja lentamente la pierna a la posición inicial. 5. Repite en el otro lado."
},
{
    name: "Sentadilla Sumo",
    description: "Variante de la sentadilla que enfatiza los glúteos y los aductores, con una postura más amplia y los pies apuntando hacia afuera.",
    sets: 3,
    reps: 10,
    weight: null, // El usuario ingresará el peso
    muscle: "Glúteos",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Colócate con los pies más separados que la anchura de los hombros y los dedos de los pies apuntando hacia afuera. 2. Sostén una mancuerna o pesa rusa frente al pecho. 3. Baja en cuclillas, manteniendo la espalda recta y el pecho erguido. 4. Baja hasta que los muslos estén paralelos al suelo. 5. Vuelve a la posición inicial, apretando los glúteos en la parte superior."
},
{
    name: "Peso Muerto",
    description: "Ejercicio compuesto que trabaja intensamente los glúteos, isquiotibiales y la espalda baja.",
    sets: 4,
    reps: 8,
    weight: null, // El usuario ingresará el peso
    muscle: "Glúteos",
    stars: 5,
    dropset: false,
    restpause: false,
    howToDo: "1. Párate frente a una barra con los pies separados a la anchura de las caderas. 2. Agáchate y agarra la barra con un agarre prono, un poco más ancho que la anchura de los hombros. 3. Mantén la espalda recta y el pecho hacia afuera. 4. Levanta la barra del suelo, extendiendo las piernas y la espalda simultáneamente. 5. Mantén la barra cerca del cuerpo durante todo el movimiento. 6. Baja la barra al suelo de forma controlada, manteniendo la espalda recta."
},
{
    name: "Step-Ups Laterales",
    description: "Variante de los step-ups que trabaja los glúteos, cuádriceps y abductores, realizando un paso lateral hacia arriba de un banco.",
    sets: 3,
    reps: 12, // Reps por pierna
    weight: null, // El usuario ingresará el peso
    muscle: "Glúteos",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Colócate de lado junto a un banco o superficie elevada. 2. Sube al banco con la pierna más cercana, colocando todo el pie sobre la superficie. 3. Mantén el torso erguido y el core apretado. 4. Baja lentamente con la misma pierna. 5. Repite con la otra pierna."
},
{
    name: "Fire Hydrants (Boca de Incendios)",
    description: "Ejercicio que trabaja el glúteo medio y la movilidad de la cadera, imitando el movimiento de un perro en una boca de incendios.",
    sets: 3,
    reps: 15, // Reps por pierna
    weight: "Peso corporal",
    muscle: "Glúteos",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Ponte a cuatro patas con las manos debajo de los hombros y las rodillas debajo de las caderas. 2. Mantén una pierna doblada a 90 grados y levántala hacia un lado, abriendo la cadera. 3. Mantén el core apretado y evita arquear la espalda. 4. Baja lentamente la pierna a la posición inicial. 5. Repite con la otra pierna."
},
{
    name: "Clamshells (Almejas)",
    description: "Ejercicio que trabaja el glúteo medio y la estabilidad de la cadera, utilizando una banda de resistencia opcional.",
    sets: 3,
    reps: 15, // Reps por pierna
    weight: "Peso corporal o banda de resistencia",
    muscle: "Glúteos",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Acuéstate de lado con las rodillas dobladas y los pies juntos. 2. Si utilizas una banda de resistencia, colócala alrededor de los muslos, justo por encima de las rodillas. 3. Manteniendo los pies juntos, levanta la rodilla superior hacia el techo, abriendo las piernas como una almeja. 4. Mantén el core apretado y evita rotar la cadera. 5. Baja lentamente la rodilla a la posición inicial. 6. Repite en el otro lado."
},
{
    name: "Puente de Glúteos a una Pierna",
    description: "Variante más desafiante del puente de glúteos que trabaja cada pierna de forma individual, mejorando el equilibrio y la fuerza.",
    sets: 3,
    reps: 12, // Reps por pierna
    weight: "Peso corporal",
    muscle: "Glúteos",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Acuéstate boca arriba con las rodillas dobladas y los pies apoyados en el suelo. 2. Extiende una pierna hacia arriba. 3. Levanta las caderas del suelo, empujando con el talón de la pierna apoyada, hasta que el cuerpo forme una línea recta desde los hombros hasta la rodilla. 4. Aprieta los glúteos en la parte superior del movimiento. 5. Baja lentamente las caderas a la posición inicial. 6. Repite con la otra pierna."
},
{
    name: "Hip Thrust a una Pierna",
    description: "Variante avanzada del hip thrust que se realiza con una sola pierna, aumentando la intensidad y el trabajo de estabilización.",
    sets: 3,
    reps: 10, // Reps por pierna
    weight: "Peso corporal",
    muscle: "Glúteos",
    stars: 5,
    dropset: false,
    restpause: false,
    howToDo: "1. Siéntate en el suelo con la espalda apoyada en un banco. 2. Dobla una rodilla y apoya el pie en el suelo. 3. Extiende la otra pierna hacia adelante. 4. Levanta las caderas del suelo, empujando con el talón de la pierna apoyada, hasta que el cuerpo forme una línea recta desde los hombros hasta la rodilla. 5. Aprieta los glúteos en la parte superior. 6. Baja lentamente las caderas a la posición inicial. 7. Repite con la otra pierna."
},
{
    name: "Patada de Glúteo con Polea",
    description: "Ejercicio que aísla los glúteos utilizando una máquina de poleas para una resistencia constante.",
    sets: 3,
    reps: 15, // Reps por pierna
    weight: null, // El usuario ingresará el peso
    muscle: "Glúteos",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Ajusta una polea baja y coloca una tobillera en una pierna. 2. Ponte de pie frente a la máquina, sujetándote a ella para mantener el equilibrio. 3. Mantén la pierna de apoyo ligeramente flexionada. 4. Extiende la pierna con la tobillera hacia atrás, contrayendo los glúteos. 5. Mantén el core apretado y evita arquear la espalda. 6. Vuelve lentamente a la posición inicial. 7. Repite con la otra pierna."
},
{
    name: "Abducción de Cadera de Pie con Polea",
    description: "Ejercicio que trabaja el glúteo medio y la estabilidad de la cadera, utilizando una máquina de poleas.",
    sets: 3,
    reps: 15, // Reps por pierna
    weight: null, // El usuario ingresará el peso
    muscle: "Glúteos",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Ajusta una polea baja y coloca una tobillera en una pierna. 2. Ponte de pie de lado a la máquina, con la pierna con la tobillera más alejada de la máquina. 3. Sujétate a la máquina para mantener el equilibrio. 4. Mantén la pierna de apoyo ligeramente flexionada. 5. Abduce la pierna con la tobillera hacia un lado, alejándola de la máquina. 6. Mantén el core apretado y el movimiento controlado. 7. Vuelve lentamente a la posición inicial. 8. Repite con la otra pierna."
},
{
    name: "Sentadilla Cosaca",
    description: "Variante avanzada de la sentadilla que trabaja la movilidad, flexibilidad y fuerza de glúteos, cuádriceps y aductores.",
    sets: 3,
    reps: 8, // Reps por pierna
    weight: "Peso corporal",
    muscle: "Glúteos",
    stars: 5,
    dropset: false,
    restpause: false,
    howToDo: "1. Párate con los pies bien separados, apuntando ligeramente hacia afuera. 2. Baja en cuclillas hacia un lado, doblando la rodilla y llevando la cadera hacia atrás, mientras mantienes la otra pierna recta y extendida hacia un lado. 3. Mantén el talón de la pierna doblada en el suelo y el pecho erguido. 4. Baja lo más que puedas, manteniendo el equilibrio. 5. Vuelve a la posición inicial, empujando con el talón de la pierna doblada. 6. Repite con la otra pierna."
},
{
    name: "Monster Walk (Caminata de Monstruo)",
    description: "Ejercicio que trabaja el glúteo medio y la estabilidad de la cadera, utilizando una banda de resistencia.",
    sets: 3,
    reps: 20, // Pasos en total
    weight: "Banda de resistencia",
    muscle: "Glúteos",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Coloca una banda de resistencia alrededor de los muslos, justo por encima de las rodillas, o alrededor de los tobillos. 2. Ponte en posición de media sentadilla, con las rodillas ligeramente flexionadas y el core apretado. 3. Da pasos hacia adelante, manteniendo la tensión en la banda y la postura de media sentadilla. 4. Camina como un 'monstruo', exagerando el movimiento y manteniendo la tensión constante en la banda. 5. También se puede realizar caminando hacia atrás o hacia los lados."
},

// GEMELOS (TRÍCEPS SURAL)
{
    name: "Elevación de Talones de Pie",
    description: "Ejercicio clásico para trabajar los gemelos, que se puede realizar con peso corporal, mancuernas o en una máquina.",
    sets: 4,
    reps: 15,
    weight: null, // El usuario ingresará el peso
    muscle: "Gemelos",
    stars: 4,
    dropset: false,
    restpause: true,
    howToDo: "1. Ponte de pie con los pies a la anchura de los hombros. 2. Puedes sostener mancuernas a los lados o usar una máquina específica. 3. Levántate sobre las puntas de los pies, elevando los talones lo más alto posible. 4. Contrae los gemelos en la parte superior del movimiento. 5. Baja lentamente los talones a la posición inicial. 6. Repite el movimiento."
},
{
    name: "Elevación de Talones Sentado",
    description: "Ejercicio que trabaja los gemelos, con un mayor énfasis en el sóleo, el músculo que se encuentra debajo de los gastrocnemios.",
    sets: 3,
    reps: 15,
    weight: null, // El usuario ingresará el peso
    muscle: "Gemelos",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Siéntate en una máquina de elevación de talones sentado o en un banco con un peso sobre las rodillas. 2. Coloca las puntas de los pies en una plataforma o en el borde de un escalón. 3. Levanta los talones lo más alto posible, contrayendo los gemelos. 4. Baja lentamente los talones a la posición inicial. 5. Repite el movimiento."
},
{
    name: "Elevación de Talones a una Pierna",
    description: "Variante más desafiante de la elevación de talones que trabaja cada pierna de forma individual, mejorando el equilibrio y la fuerza.",
    sets: 3,
    reps: 12, // Reps por pierna
    weight: "Peso corporal",
    muscle: "Gemelos",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Ponte de pie sobre una pierna, sosteniéndote de algo para mantener el equilibrio si es necesario. 2. Levántate sobre la punta del pie, elevando el talón lo más alto posible. 3. Contrae los gemelos en la parte superior del movimiento. 4. Baja lentamente el talón a la posición inicial. 5. Repite con la otra pierna."
},
{
    name: "Saltos a la comba",
    description: "Ejercicio cardiovascular que también trabaja los gemelos de forma dinámica.",
    sets: 3,
    reps: 60, // Segundos o número de saltos
    weight: "Peso corporal",
    muscle: "Gemelos",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Sujeta una comba con las manos. 2. Salta la cuerda, aterrizando sobre las puntas de los pies. 3. Mantén un ritmo constante y fluido."
},
{
    name: "Elevación de Talones en Prensa de Piernas",
    description: "Variante de la elevación de talones que utiliza la máquina de prensa de piernas para añadir resistencia.",
    sets: 3,
    reps: 15,
    weight: null, // El usuario ingresará el peso
    muscle: "Gemelos",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Siéntate en la máquina de prensa de piernas. 2. En lugar de colocar los pies completos en la plataforma, coloca solo las puntas de los pies en el borde inferior de la plataforma. 3. Extiende las piernas, empujando la plataforma hacia arriba, pero mantén las rodillas ligeramente flexionadas. 4. Levanta los talones lo más alto posible, contrayendo los gemelos. 5. Baja lentamente los talones a la posición inicial. 6. Repite el movimiento."
},
{
    name: "Elevación de Talones con Barra",
    description: "Variante de la elevación de talones de pie que utiliza una barra para añadir resistencia.",
    sets: 3,
    reps: 15,
    weight: null, // El usuario ingresará el peso
    muscle: "Gemelos",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Coloca una barra sobre la parte superior de la espalda, como en una sentadilla. 2. Ponte de pie con los pies a la anchura de los hombros. 3. Levántate sobre las puntas de los pies, elevando los talones lo más alto posible. 4. Contrae los gemelos en la parte superior del movimiento. 5. Baja lentamente los talones a la posición inicial. 6. Repite el movimiento."
},
{
    name: "Elevación de Talones en Escalón",
    description: "Variante de la elevación de talones que utiliza un escalón para aumentar el rango de movimiento.",
    sets: 3,
    reps: 15,
    weight: "Peso corporal o mancuernas",
    muscle: "Gemelos",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Ponte de pie con las puntas de los pies en el borde de un escalón, dejando los talones colgando. 2. Puedes sostener mancuernas a los lados para añadir resistencia. 3. Levántate sobre las puntas de los pies, elevando los talones lo más alto posible. 4. Contrae los gemelos en la parte superior del movimiento. 5. Baja lentamente los talones por debajo del nivel del escalón, estirando los gemelos. 6. Repite el movimiento."
},
{
    name: "Farmer's Walk en Puntillas (Caminata de Granjero en Puntillas)",
    description: "Ejercicio que trabaja los gemelos, antebrazos y el core, caminando de puntillas mientras se sostienen pesas.",
    sets: 3,
    reps: 20, // Metros o pasos
    weight: null, // El usuario ingresará el peso
    muscle: "Gemelos",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Sostén una mancuerna pesada o una pesa rusa en cada mano. 2. Levántate sobre las puntas de los pies. 3. Camina hacia adelante de puntillas, manteniendo el core apretado y la postura erguida. 4. Camina una distancia determinada o durante un tiempo determinado."
},
{
    name: "Saltos en el Sitio",
    description: "Ejercicio pliométrico que trabaja la potencia y explosividad de los gemelos.",
    sets: 3,
    reps: 15,
    weight: "Peso corporal",
    muscle: "Gemelos",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Ponte de pie con los pies juntos. 2. Salta en el mismo lugar, impulsándote con las puntas de los pies. 3. Aterriza suavemente sobre las puntas de los pies. 4. Repite el movimiento de forma rápida y explosiva."
},
{
    name: "Saltos Laterales",
    description: "Ejercicio pliométrico que trabaja los gemelos, la agilidad y la coordinación.",
    sets: 3,
    reps: 15, // Reps por lado
    weight: "Peso corporal",
    muscle: "Gemelos",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Ponte de pie con los pies juntos. 2. Salta lateralmente hacia un lado, aterrizando sobre la punta del pie. 3. Inmediatamente salta hacia el otro lado. 4. Repite el movimiento de forma rápida y fluida."
},
{
    name: "Elevación de Talones con Inclinación",
    description: "Variante que modifica el ángulo de trabajo sobre los gemelos. Se puede realizar en una superficie inclinada o en una máquina específica",
    sets: 3,
    reps: 15,
    weight: null, //Depende de la inclinacion o peso corporal
    muscle: "Gemelos",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Si usas una rampa, colócate en ella de manera que tus talones queden más bajos que las puntas de tus pies.  2. Realiza una elevación de talones estándar, contrayendo los gemelos en la parte superior. 3. Ajusta la inclinación para variar la dificultad y el enfoque del ejercicio."
},
{
    name: "Elevación de talones en Smith",
    description: "Similar a la elevación de talones con barra, pero utilizando una máquina Smith para mayor estabilidad.",
    sets: 3,
    reps: 15,
    weight: null, // El usuario ingresará el peso
    muscle: "Gemelos",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Ajusta la barra en la máquina Smith a la altura de los hombros. 2. Colócate debajo de la barra, apoyándola en la parte superior de la espalda. 3. Ponte de pie con los pies a la anchura de los hombros y las puntas de los pies en una plataforma o en el suelo. 4. Levántate sobre las puntas de los pies, elevando los talones lo más alto posible. 5. Contrae los gemelos en la parte superior del movimiento. 6. Baja lentamente los talones a la posición inicial. 7. Repite el movimiento."
},
{
    name: "Burpees con Salto de Altura",
    description: "Ejercicio cardiovascular intenso que también involucra los gemelos en el salto.",
    sets: 3,
    reps: 10,
    weight: "Peso corporal",
    muscle: "Gemelos",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Ponte de pie con los pies separados a la anchura de los hombros. 2. Baja a una posición de sentadilla y coloca las manos en el suelo delante de ti. 3. Echa los pies hacia atrás para quedar en posición de plancha. 4. Realiza una flexión de pecho (opcional). 5. Vuelve los pies a la posición de sentadilla. 6. Salta explosivamente hacia arriba, elevando las rodillas hacia el pecho y extendiendo los brazos por encima de la cabeza. 7. Aterriza suavemente y repite el movimiento."
},
{
    name: "Carrera en el Sitio Elevando Rodillas",
    description: "Ejercicio cardiovascular que trabaja los gemelos y los flexores de la cadera.",
    sets: 3,
    reps: 60, // Segundos
    weight: "Peso corporal",
    muscle: "Gemelos",
    stars: 3,
    dropset: false,
    restpause: false,
    howToDo: "1. Ponte de pie con los pies separados a la anchura de los hombros. 2. Corre en el mismo lugar, elevando las rodillas lo más alto posible. 3. Mantén un ritmo rápido y aterriza sobre las puntas de los pies. 4. Mantén el core apretado y la postura erguida."
},
{
    name: "Pogo Jumps",
    description: "Ejercicio pliométrico enfocado en la potencia y reactividad de los gemelos. Similar a saltar la cuerda pero sin ella",
    sets: 3,
    reps: 20,
    weight: "Peso corporal",
    muscle: "Gemelos",
    stars: 4,
    dropset: false,
    restpause: false,
    howToDo: "1. Ponte de pie con los pies juntos y los brazos a los lados. 2. Salta repetidamente en el mismo lugar, utilizando solo el movimiento de los tobillos y gemelos para impulsarte. 3. Mantén las piernas rectas o con una flexión mínima de las rodillas. 4. Aterriza suavemente sobre las puntas de los pies y rebota rápidamente para el siguiente salto. 5. Mantén un ritmo rápido y constante."
}
];
const uploadExercises = async () => {
try {
const exercisesCollection = collection(db, 'exercises');
for (const exercise of exercisesData) {
  await addDoc(exercisesCollection, exercise);
  console.log('Ejercicio añadido:', exercise.name);
}
console.log('Todos los ejercicios han sido subidos a Firestore.');
} catch (error) {
console.error('Error al subir ejercicios:', error);
}
};

uploadExercises();