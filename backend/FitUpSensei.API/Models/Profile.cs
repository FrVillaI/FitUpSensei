using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitUpSensei.API.Models;

[Table("profiles")]
public class Profile
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("role")]
    public string? Role { get; set; }

    [Required]
    [Column("nombre")]
    public string Nombre { get; set; } = string.Empty;

    [Required]
    [Column("apellido")]
    public string Apellido { get; set; } = string.Empty;

    [Column("avatar_id")]
    public int? AvatarId { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime? UpdatedAt { get; set; }
}
