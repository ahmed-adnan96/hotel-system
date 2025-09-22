import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Chunk'
})
export class ChunkPipe implements PipeTransform {

  transform(images: string[], chunkSize: number): string[][] {
    const chunk = []
    for (let i = 0; i < images.length; i += chunkSize) {
      chunk.push(images.slice(i, i + chunkSize));
    }
    return chunk;
  }

}
