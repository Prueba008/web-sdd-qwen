# Estructura del Proyecto Reestructurado

## Nueva Organización de Carpetas

```
src/
├── components/          # Componentes UI reutilizables
│   ├── CartDrawer.tsx
│   ├── CheckoutModal.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Icons.tsx
│   ├── Masthead.tsx
│   ├── ProductCard.tsx
│   ├── ProductModal.tsx
│   ├── Reveal.tsx
│   ├── RoastMeter.tsx
│   ├── Spotlight.tsx
│   ├── Toasts.tsx
│   └── index.ts         # Barrel exports
│
├── data/                # Datos estáticos y configuración
│   └── products.ts
│
├── features/            # Características por dominio (feature-based)
│   └── cart/
│       └── hooks/
│           ├── index.ts
│           └── useCartCalculations.ts
│
├── hooks/               # Custom hooks compartidos
│   ├── index.ts
│   ├── useCart.ts
│   └── useProductFilters.ts
│
├── lib/                 # Utilidades y funciones helper
│   └── format.ts
│
├── types/               # Definiciones de tipos (opcional, actualmente en root)
│   └── index.ts
│
├── App.tsx              # Componente principal
├── main.tsx             # Entry point
├── types.ts             # Tipos TypeScript
└── index.css            # Estilos globales
```

## Cambios Principales

### 1. Extracción de Hooks Personalizados

**Antes:** Toda la lógica de estado estaba en `App.tsx`

**Ahora:**
- `useCart`: Manejo del carrito de compras, localStorage y toasts
- `useProductFilters`: Filtrado, búsqueda y ordenamiento de productos
- `useCartCalculations`: Cálculos derivados del carrito (subtotal, shipping, total)

### 2. Barrel Exports

Se agregaron archivos `index.ts` para facilitar las importaciones:

```typescript
// En lugar de:
import { useCart } from "./hooks/useCart";
import { useProductFilters } from "./hooks/useProductFilters";

// Ahora puedes usar:
import { useCart, useProductFilters } from "./hooks";
```

### 3. Feature-Based Organization

La carpeta `features/` organiza el código por dominio funcional:
- `features/cart/`: Todo lo relacionado con el carrito
- `features/catalog/`: (Para futuro crecimiento) Catálogo de productos
- `features/search/`: (Para futuro crecimiento) Búsqueda avanzada

## Beneficios de esta Reestructuración

1. **Separación de Concerns**: Cada hook tiene una responsabilidad única
2. **Reusabilidad**: Los hooks pueden ser usados en otros componentes
3. **Testabilidad**: Es más fácil testear hooks individuales que un App.tsx gigante
4. **Escalabilidad**: Nuevas características se agregan en `features/` sin afectar el código existente
5. **Mantenibilidad**: El código es más fácil de entender y modificar

## Migración

El componente `App.tsx` ahora es mucho más limpio y legible:

```typescript
export default function App() {
  const { query, setQuery, category, ... } = useProductFilters();
  const { cart, badgeBump, toasts, addToCart, ... } = useCart();
  const { items, cartCount, subtotal, shipping, total, ... } = useCartCalculations(cart);
  
  // ... resto del componente
}
```

## Próximos Pasos Sugeridos

1. Mover `types.ts` a `types/index.ts`
2. Extraer constantes mágicas a archivos de configuración
3. Agregar tests unitarios para los hooks
4. Considerar mover componentes grandes a `features/` si crecen demasiado
