import { Course } from './course.model';

describe('Course model', () => {
  it('should create a course with all provided properties', () => {
    const course = new Course(
      1,
      'Test Title',
      20,
      'Avancé',
      'Lundi',
      '14:00-16:00',
      'La Sentinelle'
    );

    expect(course.title).toBe('Test Title');
    expect(course.capacity).toBe(20);
    expect(course.level).toBe('Avancé');
    expect(course.dayOfWeek).toBe('Lundi');
    expect(course.timeSlot).toBe('14:00-16:00');
    expect(course.location).toBe('La Sentinelle');
  });

  it('should have an id', () => {
    const c1 = new Course(1, 'T1', 10, 'Débutant', 'Lundi', '10:00-12:00', 'La Sentinelle');
    const c2 = new Course(2, 'T2', 12, 'Intermédiaire', 'Mardi', '14:00-16:00', 'Visio');

    expect(c1.id).toBe(1);
    expect(c2.id).toBe(2);
    expect(c1.id).not.toEqual(c2.id);
  });
});
