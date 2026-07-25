using InventoryManager.api.DataAccessLayer;
using InventoryManager.api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManager.api.Controllers
{ 

    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProduct()
        {
            return await _context.Products.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            Product? product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;

        }

        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
            ActionResult? validationResult = ValidateProduct(product);

            if (validationResult != null)
            {
                return validationResult;
            }

            _context.Products.Add(product);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int id, Product product)
        {
            
            if (id != product.Id)
            {
                return BadRequest("Product ID mismatch");
            }

            ActionResult? validationResult = ValidateProduct(product);

            if (validationResult != null)
            {
                return validationResult;
            }


            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Products.Any(p => p.Id == id))

                    return NotFound();

                else

                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            Product? product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();

        }

        private ActionResult? ValidateProduct(Product product)
        {
            if (string.IsNullOrWhiteSpace(product.Name))
            {
                return BadRequest("Product name is required.");
            }
            if (product.Name.Length > 100)
            {
                return BadRequest("Name must not be longer than 100 characters.");
            }
            if (string.IsNullOrWhiteSpace(product.SKU))
            {
                return BadRequest("SKU is required");
            }
            if (product.SKU.Length > 10)
            {
                return BadRequest("SKU cannot be longer than 10 characters.");
            }
            if (string.IsNullOrWhiteSpace(product.Description))
            {
                return BadRequest("Description is required.");
            }
            if (product.Description.Length > 250)
            {
                return BadRequest("Description cannot be longer than 250 characters.");
            }
            if (string.IsNullOrWhiteSpace(product.Category))
            {
                return BadRequest("Category is required.");
            }
            if (product.Category.Length > 50)
            {
                return BadRequest("Category must not be longer than 50 characters.");
            }
            if (product.Quantity < 0)
            {
                return BadRequest("Quantity cannot be negative");
            }
            if (product.Price <= 0)
            {
                return BadRequest("Price must be greater than 0.");
            }

            return null;
        }

    }
}
