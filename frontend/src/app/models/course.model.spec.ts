import { Course } from './course.model';

describe('Course model', () => {
  it('should create a course with all provided properties', () => {
    const course = new Course(
      'Test Title',
      'Test Description',
      'image.jpg',
      20,
      'Avancé',
      '10-12 ans'
    );

    expect(course.title).toBe('Test Title');
    expect(course.description).toBe('Test Description');
    expect(course.imageUrl).toBe('image.jpg');
    expect(course.capacity).toBe(20);
    expect(course.level).toBe('Avancé');
    expect(course.ageBracket).toBe('10-12 ans');
  });

  it('should automatically generate a random id', () => {
    const c1 = new Course('T1', 'D1', 'img.jpg', 10, 'Débutant', '6-9 ans');
    const c2 = new Course('T2', 'D2', 'img2.jpg', 12, 'Intermédiaire', '10-12 ans');

    expect(c1.id).toBeTruthy(); // id exists
    expect(c2.id).toBeTruthy();
    expect(c1.id).not.toEqual(c2.id); // id is unique
  });
});
