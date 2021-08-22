import { PartialType } from '@nestjs/mapped-types';
import CreateMovieDto from './create-movie.dto';

class UpdateMovieDto extends PartialType(CreateMovieDto) {}

export default UpdateMovieDto;
