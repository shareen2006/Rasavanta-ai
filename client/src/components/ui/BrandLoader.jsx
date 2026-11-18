import { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';

export const BrandLoader = () => {
  const { isTransitioning } = useNavigation();
  const shouldReduceMotion = useReducedMotion();

  // Lock body scroll while loader is active
  useEffect(() => {
    if (isTransitioning) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isTransitioning]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="brand-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#F5F0E5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0',
          }}
        >
          {/* Official Logo: scales smoothly from 0.85 to 1.0 */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '26px',
            }}
          >
            <img
              src="/brand/rasavanta-logo.jpg"
              alt="RASAVANTA AI"
              style={{
                height: 'clamp(115px, 22vw, 155px)',
                width: 'auto',
                maxWidth: 'min(88vw, 300px)',
                objectFit: 'contain',
              }}
              onError={(e) => {
                e.currentTarget.src = '/brand/rasavanta-logo.png';
              }}
            />
          </motion.div>

          {/* Gold Progress Indicator Bar */}
          <div
            style={{
              width: 'clamp(140px, 32vw, 220px)',
              height: '2.5px',
              backgroundColor: 'rgba(217, 154, 56, 0.2)',
              borderRadius: '9999px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.05, delay: 0.15, ease: 'easeInOut' }}
              style={{
                height: '100%',
                backgroundColor: '#D99A38',
                transformOrigin: 'left',
                borderRadius: '9999px',
                boxShadow: '0 0 10px rgba(217, 154, 56, 0.7)',
              }}
            />
          </div>

          {/* Subtle Decorative Gold-Sage Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.65, duration: 0.25 }}
            style={{
              display: 'flex',
              gap: '6px',
              marginTop: '18px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 0.85,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: 'easeInOut',
                }}
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: '#A7B99A',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BrandLoader;
