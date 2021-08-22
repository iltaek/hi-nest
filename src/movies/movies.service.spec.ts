import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2000,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array in any situation', () => {
      // given, when
      const result = service.getAll();

      // then
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie with valid id', () => {
      // given
      // when
      const movie = service.getOne(1);

      // then
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw a NotFoundException with unknownId', () => {
      // given
      const unknownId = 999;

      try {
        // when
        service.getOne(unknownId);
      } catch (e) {
        // then
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID ${unknownId} not found.`);
      }
    });
  });

  describe('deleteOne()', () => {
    it('should delete a movie with valid id', () => {
      // given
      // when
      const beforeDeleteOneMovie = service.getAll().length;
      service.deleteOne(1);
      const afterDeleteOneMovie = service.getAll().length;

      // then
      expect(afterDeleteOneMovie).toBeLessThan(beforeDeleteOneMovie);
    });

    it('should throw a NotFoundException with unknownId', () => {
      // given
      const unknownId = 999;

      try {
        // when
        service.deleteOne(unknownId);
      } catch (e) {
        // then
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID ${unknownId} not found.`);
      }
    });
  });

  describe('create()', () => {
    it('should create a movie with valid params', () => {
      // given
      const beforeCreateMovies = service.getAll().length;

      // when
      service.create({
        title: 'Test Movie1',
        genres: ['test1'],
        year: 2001,
      });
      const afterCreateMovies = service.getAll().length;

      // then
      expect(afterCreateMovies).toBeGreaterThan(beforeCreateMovies);
    });
  });

  describe('update()', () => {
    it('should update a movie with valid params', () => {
      // given
      const updateTitle = 'Updated Test';

      //when
      service.update(1, { title: updateTitle });

      //then
      const updatedMovie = service.getOne(1);
      expect(updatedMovie.title).toEqual(updateTitle);
    });

    it('should throw a NotFoundException with unknownId', () => {
      // given
      const unknownId = 999;

      try {
        //when
        service.update(unknownId, {});
      } catch (e) {
        //then
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID ${unknownId} not found.`);
      }
    });
  });
});
