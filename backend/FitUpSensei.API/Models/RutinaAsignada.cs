using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitUpSensei.API.Models;

[Table("rutinas_asignadas")]
public class RutinaAsignada
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [Column("rutina_id")]
    public Guid RutinaId { get; set; }

    [Required]
    [Column("cliente_id")]
    public Guid ClienteId { get; set; }

    [Column("fecha_asignacion")]
    public DateOnly? FechaAsignacion { get; set; }

    [Column("activa")]
    public bool? Activa { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }
}
