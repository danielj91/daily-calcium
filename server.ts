import angularApp from './dist/daily-calcium/browser/index.html';
import type {
  CalciumItem,
  CreateCalciumItemDto,
  UpdateCalciumItemDto,
} from './src/app/shared/calcium-item.ts';

const CALCIUM_ITEMS_FILE = 'calcium-items.json';

Bun.serve({
  port: 4201,
  routes: {
    '/': angularApp,
    '/api/calcium-items': {
      GET: getAllCalciumItems,
      POST: saveCalciumItem,
    },
    '/api/calcium-items/:id': {
      DELETE: deleteCalciumItem,
      PATCH: updateCalciumItem,
    },
    '/*': Response.redirect('/'),
  },
});

async function getAllCalciumItems(_request: Request): Promise<Response> {
  try {
    const file = Bun.file(CALCIUM_ITEMS_FILE);

    if (await file.exists()) {
      return Response.json(await file.json());
    } else {
      return Response.json([]);
    }
  } catch (error) {
    console.error('Error getting list of calcium items', error);
    return new Response('Internal server error', { status: 500 });
  }
}

async function saveCalciumItem(request: Request): Promise<Response> {
  var requestItem: CreateCalciumItemDto;
  var calciumItems: CalciumItem[] = [];

  try {
    requestItem = await request.json();
    const file = Bun.file(CALCIUM_ITEMS_FILE);

    if (await file.exists()) {
      calciumItems = JSON.parse(await file.text());
    } else {
      await Bun.write(file, JSON.stringify([]));
    }

    const newCalciumItem: CalciumItem = {
      id: crypto.randomUUID(),
      name: requestItem.name,
      calcium_per_unit: requestItem.calcium_per_unit,
      units: requestItem.units,
    };

    calciumItems.push(newCalciumItem);
    await Bun.write(file, JSON.stringify(calciumItems));

    return Response.json(newCalciumItem, { status: 201 });
  } catch (error) {
    console.error('Error saving calcium item', error);
    return new Response('Internal server error', { status: 500 });
  }
}

async function deleteCalciumItem(
  request: Bun.BunRequest<'/api/calcium-items/:id'>,
): Promise<Response> {
  const id = request.params.id;
  const file = Bun.file(CALCIUM_ITEMS_FILE);
  var calciumItems: CalciumItem[];

  try {
    if (await file.exists()) {
      calciumItems = await file.json();

      const index = calciumItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        calciumItems.splice(index, 1);
        await Bun.write(file, JSON.stringify(calciumItems));
        return new Response(null, { status: 204 });
      } else {
        return new Response('Item not found', { status: 404 });
      }
    } else {
      return new Response('Item not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting calcium item', error);
    return new Response('Internal server error', { status: 500 });
  }
}

async function updateCalciumItem(
  request: Bun.BunRequest<'/api/calcium-items/:id'>,
): Promise<Response> {
  const id = request.params.id;
  const file = Bun.file(CALCIUM_ITEMS_FILE);
  var requestItem: UpdateCalciumItemDto = await request.json();
  var calciumItems: CalciumItem[];
  var existingItem: CalciumItem;
  var updatedItem: CalciumItem;

  try {
    if (await file.exists()) {
      calciumItems = await file.json();

      const index = calciumItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        existingItem = calciumItems[index];

        updatedItem = {
          ...existingItem,
          ...requestItem,
        };

        calciumItems[index] = updatedItem;
        await Bun.write(file, JSON.stringify(calciumItems));

        return new Response('Item updated', { status: 204 });
      } else {
        return new Response('Item not found', { status: 404 });
      }
    } else {
      return new Response('Item not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error updating calcium item', error);
    return new Response('Internal server error', { status: 500 });
  }
}
