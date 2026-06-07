import NextImage, { type ImageProps } from 'next/image';

import { withBasePath } from '@/shared/config/basePath';

// В standalone-сборке встроенный оптимизатор фетчит исходник по `url` относительно
// своего origin и НЕ добавляет basePath. Поэтому локальный src вида "/products/x.jpg"
// надо отдать как "/market/products/x.jpg" — иначе оптимизатор отвечает 400.
// Обёртка делает это прозрачно для всех локальных строковых src.
export function Image({ src, ...props }: ImageProps) {
  const resolvedSrc = typeof src === 'string' && src.startsWith('/') ? withBasePath(src) : src;

  return <NextImage src={resolvedSrc} {...props} />;
}
