import prisma from "../../prisma";

async function updateOrCreateProductInteraction(productId: number) {
  try {
    let interaction = await prisma.interactions.findUnique({
      where: { productId },
    });

    if (interaction) {
      interaction = await prisma.interactions.update({
        where: { id: interaction.id },
        data: { count: { increment: 1 } },
      });
    } else {
      interaction = await prisma.interactions.create({
        data: {
          productId,
          count: 1,
          sells: 0,
        },
      });
    }

    return interaction;
  } catch (error) {
    console.error("Error updating or creating product interaction:", error);
    throw new Error("Failed to update or create product interaction");
  }
}

export { updateOrCreateProductInteraction };
