using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitUpSensei.API.Models;

[Table("rutinas")]
public class Rutina
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [Column("coach_id")]
    public Guid CoachId { get; set; }

    [Required]
    [Column("nombre")]
    public string Nombre { get; set; } = string.Empty;

    [Column("descripcion")]
    public string? Descripcion { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime? UpdatedAt { get; set; }
}
